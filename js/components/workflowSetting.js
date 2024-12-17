export function workflowSetting() {
  isActiveBtn();
  horizontalScroll();
}

// 워크플로우 세팅 버튼 활성화/비활성화 (공용)
function isActiveBtn() {
  const workflowBtns = document.querySelectorAll('.btn_workflow_setting');
  const isActive = 'active';

  workflowBtns.forEach((btn) => {
    btn.addEventListener('click', function() {
      if (this.classList.contains(isActive)) {
        this.classList.remove(isActive);
      } else {
        this.classList.add(isActive);
        const parent = this.parentElement;
        const siblings = parent.parentElement.children;
        for (let sibling of siblings) {
          if (sibling !== parent) {
            const siblingBtn = sibling.querySelector('.btn_workflow_setting');
            if (siblingBtn) {
              siblingBtn.classList.remove(isActive);
            }
          }
        }
      }
    });
  });
}

// 워크플로우 세팅 스크롤 이벤트 (데스크탑)
function horizontalScroll() {
  const element = document.querySelector('.section_workflow_setting');

  function checkWindowWidth() {
    if (window.innerWidth >= 1040) {
      if (element) {
        let isMouseOver = false; // 마우스가 올라와 있는지 여부를 추적

        element.addEventListener('mouseenter', () => {
          isMouseOver = true;
        });

        element.addEventListener('mouseleave', () => {
          isMouseOver = false;
        });

        element.addEventListener(
          'wheel',
          function (e) {
            if (isMouseOver) {
              e.preventDefault(); 
              const delta = e.deltaY; 
              element.scrollLeft += delta; 
            }
          },
          { passive: false } 
        );
      }
    } else {
      if (element) {
        element.removeEventListener('mouseenter', () => {});
        element.removeEventListener('mouseleave', () => {});
        element.removeEventListener('wheel', () => {});
      }
    }
  }

  window.addEventListener('resize', checkWindowWidth);

  checkWindowWidth();
}
