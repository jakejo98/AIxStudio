export function generateProgressBar(){
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
}

// Mock Progress와 실제 데이터를 결합하여 진행률 바 업데이트
export function updateProgressBarWithMock(progress) {
  const progressBar = document.querySelector(".progressbar");
  if (progressBar) {
    progressBar.style.width = `${progress}%`;
  }
}

// 프로그래스바 텍스트 효과
export function commonProgressTextEffects() {
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

// 진행률 바 너비 업데이트
// function updateProgressBar(progress) {
//   const progressBar = document.querySelector(".progressbar");
//   if (progressBar) {
//     progressBar.style.width = `${progress}%`;
//   }
// }