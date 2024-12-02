const serverAddress = "222.109.124.51:8188";
const clientId = uuidv4(); // 고유 클라이언트 ID 생성

// JSON 캐싱을 위한 Map 객체 생성
const jsonCache = new Map();

document.querySelector(".btn_generate_image").addEventListener("click", handleFormSubmit);

async function handleFormSubmit(event) {
    event.preventDefault();
    const prompt = document.querySelector(".prompt_input").value;

    try {
        // .btn_workflow_setting의 상태에 따라 JSON 파일 결정
        let jsonPath;
        const workflowItems = document.querySelectorAll(".workflow_setting_item .btn_workflow_setting");

        if (workflowItems[0] && workflowItems[0].classList.contains("active")) {
            jsonPath = "/AIxStudio/json/duct01_workflow_api.json";
        } else if (workflowItems[1] && workflowItems[1].classList.contains("active")) {
            jsonPath = "/AIxStudio/json/illust01_workflow_api.json";
        } else {
            jsonPath = "/AIxStudio/json/576864_workflow_api.json";
        }

        // JSON 템플릿 로드 및 사용자 입력 병합
        const basePromptData = await loadPromptData(jsonPath);

        // 기본 입력값 추가: "illustration of" (변경가능)
        const defaultInput = "illustration of"; // 추가된 기본 입력값
        const userPrompt = `${defaultInput} ${prompt}`; // 기본 입력값과 사용자 입력 결합
        const promptData = mergePromptData(basePromptData, userPrompt, jsonPath);

        // WebSocket 연결
        const ws = new WebSocket(`ws://${serverAddress}/ws?clientId=${clientId}`);

        ws.onopen = () => {
            const generateSection = document.querySelector(".section_generate");
            const generateDimmed = `
                <div class="generate_dimmed">
                    <div class="progress_container">
                        <p class="progress_text">
                        <span class="progress_text_char">이</span>
                        <span class="progress_text_char">미</span>
                        <span class="progress_text_char">지</span>
                        <span class="progress_text_char"> </span>
                        <span class="progress_text_char">생</span>
                        <span class="progress_text_char">성</span>
                        <span class="progress_text_char">중</span>
                        <span class="progress_text_char"> </span>
                        <span class="progress_text_char">.</span>
                        <span class="progress_text_char">.</span>
                        <span class="progress_text_char">.</span>
                        </p>            
                    <div class="progress" id="progress">
                        <div class="progressbar" id="progressbar">
                        <span class="blind">프로그래스바</span>
                        </div>
                    </div>
                    </div>
                </div>
                `;

            const imagesContainer = `
            <div class="generate"></div>
            `;  

            document.body.classList.add("is-fixed");
            if (!generateSection.classList.contains("active")) {
                generateSection.classList.add("active");
            }
            generateSection.insertAdjacentHTML('afterbegin', generateDimmed);
            generateSection.insertAdjacentHTML('afterbegin', imagesContainer);
            commonProgressTextEffects();

            getImages(ws, promptData, updateProgressBarWithMock)
                .then(outputImages => {
                    displayImages(outputImages);
                    document.body.classList.remove("is-fixed");
                    const dimmedElement = document.querySelector(".generate_dimmed");
                    const promptSetting = document.querySelector(".section_prompt_setting");
                    if (dimmedElement) {
                        dimmedElement.remove(); 
                    }
                    promptSetting.classList.remove("active");
                })
                .catch(error => {
                    console.error("Error processing images:", error);
                });
        };

        ws.onerror = (error) => {
            console.error("WebSocket error:", error.message, error);
        };

        ws.onclose = () => {
            
        };
    } catch (error) {
        console.error("Error generating image:", error);
    }
}

// Load JSON prompt template from file (캐싱 기능 추가)
async function loadPromptData(filePath) {
    if (jsonCache.has(filePath)) {
        console.log("Using cached JSON:", filePath);
        return jsonCache.get(filePath);
    }

    console.log("Loading JSON from server:", filePath);
    const response = await fetch(filePath);
    if (!response.ok) throw new Error("Failed to load JSON file.");

    const jsonData = await response.json();
    jsonCache.set(filePath, jsonData); // 캐시에 저장
    return jsonData;
}

// Merge base prompt data with user input
function mergePromptData(basePromptData, userPrompt, jsonPath) {
    const additionalPrompt = "The model wears an oversized fleece jacket with an abstract swirl pattern in green and orange, featuring a high collar and an orange chest pocket as accent details. highlighting the model.";
    if (jsonPath === "/AIxStudio/json/duct01_workflow_api.json") {
        userPrompt = `${userPrompt} ${additionalPrompt}`;
    }
    basePromptData["6"]["inputs"]["text"] = userPrompt; // Positive prompt
    basePromptData["3"]["inputs"]["seed"] = Math.floor(Math.random() * 1000000000); // Random seed
    return basePromptData;
}

// Mock Progress를 사용하여 WebSocket을 통해 이미지 가져오기
async function getImages(ws, prompt, updateProgressBarCallback) {
    const promptResponse = await queuePrompt(prompt);
    const promptId = promptResponse.prompt_id;

    return new Promise((resolve, reject) => {
        const outputImages = {};
        let progress = 0; // Initialize progress

        // Start Mock Progress Interval
        const intervalId = setInterval(() => {
            if (progress < 95) { // Limit Mock Progress to 90%
                progress += Math.random() * 1; // Random incremental progress
                updateProgressBarCallback(progress);
            }
        }, 500); // Update every 0.5s

        ws.onmessage = async (event) => {
            try {
                const message = JSON.parse(event.data);

                if (message.type === "executing") {
                    const data = message.data;

                    // Update progress bar dynamically with real progress
                    progress += 5; // Increment progress
                    updateProgressBarCallback(progress);

                    // Check if image generation is complete
                    if (!data.node && data.prompt_id === promptId) {
                        clearInterval(intervalId); // Stop Mock Progress
                        ws.close(); // Close WebSocket connection
                    }
                }
            } catch (error) {
                console.error("Error processing WebSocket message:", error);
                clearInterval(intervalId); // Ensure Mock Progress stops on error
                reject(error);
            }
        };

        ws.onclose = async () => {
            try {
                clearInterval(intervalId); // Stop Mock Progress
                const history = await getHistory(promptId);
                for (const nodeId in history[promptId].outputs) {
                    const nodeOutput = history[promptId].outputs[nodeId];
                    const imagesOutput = [];

                    if (nodeOutput.images) {
                        for (const image of nodeOutput.images) {
                            const imageData = await getImage(image.filename, image.subfolder, image.type);
                            imagesOutput.push(imageData);
                        }
                    }
                    outputImages[nodeId] = imagesOutput;
                }
                resolve(outputImages);
            } catch (error) {
                reject(error);
            }
        };
    });
}

// 서버로 프롬프트 큐잉
async function queuePrompt(prompt) {
    const response = await fetch(`http://${serverAddress}/prompt`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, client_id: clientId })
    });
    if (!response.ok) throw new Error("Failed to queue prompt.");
    return await response.json();
}

// 프론트엔드에 이미지 표시
function displayImages(outputImages) {
    const imagesContainer = document.querySelector(".generate");

    for (const nodeId in outputImages) {
        outputImages[nodeId].forEach((imageUrl) => {
            const img = document.createElement("img");
            img.src = imageUrl;
            imagesContainer.appendChild(img);
        });
    }
}

// 진행률 바 너비 업데이트
function updateProgressBar(progress) {
    const progressBar = document.querySelector(".progressbar");
    if (progressBar) {
        progressBar.style.width = `${progress}%`;
    }
}

// UUID 생성 함수
function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = (Math.random() * 16) | 0,
            v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}

// Mock Progress와 실제 데이터를 결합하여 진행률 바 업데이트
function updateProgressBarWithMock(progress) {
    const progressBar = document.querySelector(".progressbar");
    if (progressBar) {
        progressBar.style.width = `${progress}%`;
    }
}

// 이미지 기록 가져오기
async function getHistory(promptId) {
    const response = await fetch(`http://${serverAddress}/history/${promptId}`);
    if (!response.ok) throw new Error("Failed to get history.");
    return await response.json();
}

// 이미지 데이터 가져오기
async function getImage(filename, subfolder, folderType) {
    const params = new URLSearchParams({ filename, subfolder, type: folderType });
    const response = await fetch(`http://${serverAddress}/view?${params.toString()}`);
    if (!response.ok) throw new Error("Failed to fetch image.");
    return URL.createObjectURL(await response.blob());
}

// 프로그래스바 텍스트 효과
function commonProgressTextEffects() {
    const chars = $('.progress_text_char'); 
    let index = 0;
  
    function revealChars() {
      if (index < chars.length) {
        chars.eq(index).addClass('active'); 
        index++;
        setTimeout(revealChars, 300); 
      } else {
        setTimeout(() => {
          chars.removeClass('active'); 
          index = 0;
          revealChars(); 
        }, 1000); 
      }
    }
  
    revealChars();
}
