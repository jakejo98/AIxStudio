const serverAddress = "https://designpscz--example-comfyui-comfyui-api-dev.modal.run";
const clientId = uuidv4(); // 고유 클라이언트 ID 생성

// JSON 캐싱을 위한 Map 객체 생성
const jsonCache = new Map();

document.querySelector(".btn_generate_image").addEventListener("click", handleFormSubmit);

async function handleFormSubmit(event) {
  event.preventDefault();
  const prompt = document.querySelector(".prompt_input").value;

  try {
    // .btn_workflow_setting의 상태에 따라 JSON 파일 결정
    const workflowItems = document.querySelectorAll(".workflow_setting_item .btn_workflow_setting");

    const workflowPaths = [
      "/AIxStudio/json/duct01_workflow_api.json", 
      "/AIxStudio/json/illust01_workflow_api.json", 
      "/AIxStudio/json/flux01_workflow_api.json",
      "/AIxStudio/json/test_workflow_api.json"
    ];
    
    // active 클래스를 가진 첫 번째 항목을 찾기
    const activeItemIndex = Array.from(workflowItems).findIndex(item => item.classList.contains("active"));
    
    // 해당 인덱스에 맞는 경로 반환
    const jsonPath = activeItemIndex !== -1 ? workflowPaths[activeItemIndex] : workflowPaths[workflowPaths.length - 1];

    // JSON 템플릿 로드 및 사용자 입력 병합
    const basePromptData = await loadPromptData(jsonPath);
    const userPrompt = `${prompt}`; // 기본 입력값과 사용자 입력 결합
    const promptData = mergePromptData(basePromptData, userPrompt, jsonPath);

    // WebSocket 연결
    const ws = new WebSocket(`ws://${serverAddress}/ws?clientId=${clientId}`);

    ws.onopen = () => {
      const generateSection = document.querySelector(".section_generate");
      const generateProgress = `
            <div class="display_progress">
                <div class="dimmed"></div>
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
                    <div class="progress">
                    <div class="progressbar">
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
      generateSection.insertAdjacentHTML('afterbegin', generateProgress);
      generateSection.insertAdjacentHTML('afterbegin', imagesContainer);
      commonProgressTextEffects();

      getImages(ws, promptData, updateProgressBarWithMock)
        .then(outputImages => {
          displayImages(outputImages);
          document.body.classList.remove("is-fixed");
          const generateProgress = document.querySelector(".display_progress");
          const promptSetting = document.querySelector(".section_prompt_setting");
          if (generateProgress) {
            generateProgress.remove();
          }
          promptSetting.classList.remove("active");
          originalImage();
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
  // 문장을 객체로 정의
  const promptAdditions = {
    "/AIxStudio/json/duct01_workflow_api.json": "The model wears an oversized fleece jacket with an abstract swirl pattern in green and orange, featuring a high collar and an orange chest pocket as accent details. highlighting the model.",
    "/AIxStudio/json/illust01_workflow_api.json": "Illustration of"
  };

  // jsonPath에 해당하는 문장이 있으면 userPrompt에 추가
  if (promptAdditions[jsonPath]) {
    userPrompt = `${promptAdditions[jsonPath]} ${userPrompt}`;
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
      img.className = "generate_image"
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

// 이미지 원본 사이즈 제공
function originalImage() {
  viewOriginalImage();
  downloadOriginalImage();
  closeOrignalImage();

  // 원본 이미지 보기
  function viewOriginalImage() {
    const generateSection = document.querySelector(".section_generate");
    const generateImages = document.querySelectorAll(".generate_image");

    generateImages.forEach(function (generateImages) {
      generateImages.addEventListener("click", function () {
        const generateImageUrl = this.getAttribute("src");
        const originalTemplate = `
         <div class="ly_pop_original_image">
          <div class="dimmed"></div>
          <button class="btn_original_image btn_original_image_close">
            <span class="common_icon icon_original_image_close">
              <span class="blind">원본 이미지 닫기</span>
            </span>
          </button>
          <button class="btn_original_image btn_original_image_save">
            <span class="common_icon icon_original_image_save">
              <span class="blind">원본 이미지 저장</span>
            </span>
          </button>
          <div class="original_image_box">
            <img src="${generateImageUrl}" alt="Generate Image" class="original_image">
          </div>
        </div>
          `;
          
        document.body.classList.add("is-fixed");
        generateSection.insertAdjacentHTML("beforeend", originalTemplate);
      });
    });
  }
  // 원본 이미지 다운로드
  function downloadOriginalImage() {
    // 동적으로 버튼이 추가될 수 있으므로 이벤트 위임 사용
    document.body.addEventListener('click', function (event) {
      // 클릭된 요소의 가장 가까운 .btn_save_original_image 찾기
      const saveButton = event.target.closest('.btn_original_image_save');
      if (saveButton) {
        const imageElement = document.querySelector('.original_image');

        if (imageElement) {
          const imageUrl = imageElement.src;

          // 5자리 랜덤 숫자 생성
          const randomNumber = Math.floor(Math.random() * 100000).toString().padStart(5, '0');
          const fileName = `AIxStudio_${randomNumber}.png`;

          const link = document.createElement('a');
          link.href = imageUrl;
          link.download = fileName; // 다운로드될 파일명
          link.click();
        } else {
          console.error('Image element not found.');
        }
      }
    });
  }
  // 원본 이미지 레이어 닫기
  function closeOrignalImage() {
    document.body.addEventListener('click', function (event) {
      // 클릭된 요소가 .btn_close_original_image인지 확인
      const closeButton = event.target.closest('.btn_original_image_close');
      if (closeButton) {
        // body에서 is-fixed 클래스 제거
        document.body.classList.remove('is-fixed');

        // section_generate 안에 있는 .ly_pop_original_image 제거
        const sectionGenerate = document.querySelector('.section_generate');
        const popupElement = sectionGenerate.querySelector('.ly_pop_original_image');
        if (popupElement) {
          popupElement.remove(); // .ly_pop_original_image 요소 제거
        } else {
          console.error('Popup element not found in section_generate.');
        }
      }
    });
  }
}




