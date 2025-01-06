import { serverAddress, clientId } from "./serverConfig.js";
import { updateProgressBarWithMock, generateProgressBar} from "./progress.js";
import { originalImage, getHistory, getImage, displayImages } from "./image.js";
import { queuePrompt } from "./prompt.js";

// JSON 캐싱을 위한 Map 객체 생성
const jsonCache = new Map();

document.querySelector(".btn_generate_image").addEventListener("click", handleFormSubmit);

async function handleFormSubmit(event) {
  event.preventDefault();
  const prompt = document.querySelector(".prompt_input").value.trim(); // 공백 제거

  if (!prompt) {
    alert("프롬프트를 입력하세요!"); // 빈 값 알림
    return; // 함수 종료
  }

  try {
    // .btn_workflow_setting의 상태에 따라 JSON 파일 결정
    const workflowItems = document.querySelectorAll(".workflow_setting_item .btn_workflow_setting");

    const workflowPaths = [
      "json/duct01_workflow_api.json", 
      "json/illust01_workflow_api.json", 
      "json/flux01_workflow_api.json",
      "json/test_workflow_api.json"
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
      generateProgressBar();

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
    "json/duct01_workflow_api.json": "The model wears an oversized fleece jacket with an abstract swirl pattern in green and orange, featuring a high collar and an orange chest pocket as accent details. highlighting the model.",
    "json/illust01_workflow_api.json": "Illustration of"
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