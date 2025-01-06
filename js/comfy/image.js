import { serverAddress, clientId } from "./serverConfig.js";

// 이미지 원본 사이즈 제공
export function originalImage() {
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

// 이미지 기록 가져오기
export async function getHistory(promptId) {
  const response = await fetch(`http://${serverAddress}/history/${promptId}`);
  if (!response.ok) throw new Error("Failed to get history.");
  return await response.json();
}

// 이미지 데이터 가져오기
export async function getImage(filename, subfolder, folderType) {
  const params = new URLSearchParams({ filename, subfolder, type: folderType });
  const response = await fetch(`http://${serverAddress}/view?${params.toString()}`);
  if (!response.ok) throw new Error("Failed to fetch image.");
  return URL.createObjectURL(await response.blob());
}

// 프론트엔드에 이미지 표시
export function displayImages(outputImages) {
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