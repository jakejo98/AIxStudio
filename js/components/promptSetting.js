export function promptSetting() {
  isActive();
  assetsPopup();
  populatePromptWithText();
}

// 프롬프트 세팅 활성화/비활성화 (공용)
function isActive() {
  const isActiveSettingBtn = document.querySelector('.btn_prompt_setting');
  const setting = document.querySelector('.section_prompt_setting');
  const isActive = 'active';

  isActiveSettingBtn.addEventListener('click', function (event) {
    event.preventDefault();
    setting.classList.toggle(isActive);
  });
}

// 프롬프트 세팅 활성화 후 선택 버튼 클릭 시 자료 레이어 활성화
function assetsPopup() {
  const settingItem = document.querySelectorAll('.prompt_setting_item');
  const isActiveSettingPopupBtn = document.querySelectorAll('.btn_prompt_setting_select');
  const popupCloseBtn = document.querySelectorAll('.btn_ly_pop_close');
  const popup = document.querySelectorAll('.ly_pop_wrap');
  const isActive = 'active';
  const isFixed = 'is-fixed';

  isActiveSettingPopupBtn.forEach((btn) => {
    btn.addEventListener('click', function () {
      document.body.classList.add(isFixed);
      const btnIndex = Array.from(settingItem).indexOf(this.closest('.prompt_setting_item')) - 2;
      popup[btnIndex].classList.add(isActive);
      popup.forEach((p, index) => {
        if (index !== btnIndex) p.classList.remove(isActive);
      });
    });
  });

  popupCloseBtn.forEach((btn) => {
    btn.addEventListener('click', function () {
      document.body.classList.remove(isFixed);
      popup.forEach((p) => {
        p.classList.remove(isActive);
      });
    });
  });
}

// 프로프트 세팅 값 입력시 프롬프트 창에 해당 텍스트 대입
function populatePromptWithText() {
  const layer = document.querySelectorAll('.ly_pop_wrap');
  const assetsBox = '.ly_pop_assets_box';
  const assetsType = '.ly_pop_assets_type';
  const isActive = 'active';
  const isFixed = 'is-fixed';
  let promptText = '';
  let styleKeyword = '';
  let subjectKeyword = '';
  let framingKeyword = '';
  let backgroundKeyword = '';
  let lightingKeyword = '';
  let cameraAngleKeyword = '';
  let cameraPropertiesKeyword = '';
  let filmTypesKeyword = '';
  let lensesKeyword = '';
  let filtersEffectsKeyword = '';
  let photographersKeyword = '';
  
  style();
  subject();
  framing();
  background();
  lighting();
  cameraAngle();
  cameraProperties();
  filmTypes();
  lenses();
  filtersEffects();
  photographers();
  resetPrompt();

  function style() {
    layer[0].querySelectorAll(assetsBox).forEach(item => {
      item.addEventListener('click', function () {
        const keyword = item.querySelector(assetsType).textContent;
        styleKeyword = keyword;
        document.getElementById('style').value = styleKeyword;
        document.body.classList.remove(isFixed);
        layer.forEach(l => l.classList.remove(isActive));
        updatePromptText();
      });
    });

    document.getElementById('style').addEventListener('input', function () {
      const inputText = this.value;
      styleKeyword = inputText;
      updatePromptText();
    });
  }

  function subject() {
    document.getElementById('subject').addEventListener('input', function () {
      const inputText = this.value;
      subjectKeyword = inputText;
      updatePromptText();
    });
  }

  function framing() {
    layer[1].querySelectorAll(assetsBox).forEach(item => {
      item.addEventListener('click', function () {
        const keyword = item.querySelector(assetsType).textContent;
        framingKeyword = keyword;
        document.getElementById('framing').value = framingKeyword;
        document.body.classList.remove(isFixed);
        layer.forEach(l => l.classList.remove(isActive));
        updatePromptText();
      });
    });

    document.getElementById('framing').addEventListener('input', function () {
      const inputText = this.value;
      framingKeyword = inputText;
      updatePromptText();
    });
  }

  function background() {
    document.getElementById('background').addEventListener('input', function () {
      const inputText = this.value;
      backgroundKeyword = inputText;
      updatePromptText();
    });
  }

  function lighting() {
    layer[2].querySelectorAll(assetsBox).forEach(item => {
      item.addEventListener('click', function () {
        const keyword = item.querySelector(assetsType).textContent;
        lightingKeyword = keyword;
        document.getElementById('lighting').value = lightingKeyword;
        document.body.classList.remove(isFixed);
        layer.forEach(l => l.classList.remove(isActive));
        updatePromptText();
      });
    });

    document.getElementById('lighting').addEventListener('input', function () {
      const inputText = this.value;
      lightingKeyword = inputText;
      updatePromptText();
    });
  }

  function cameraAngle() {
    layer[3].querySelectorAll(assetsBox).forEach(item => {
      item.addEventListener('click', function () {
        const keyword = item.querySelector(assetsType).textContent;
        cameraAngleKeyword = keyword;
        document.getElementById('camera_angle').value = cameraAngleKeyword;
        document.body.classList.remove(isFixed);
        layer.forEach(l => l.classList.remove(isActive));
        updatePromptText();
      });
    });

    document.getElementById('camera_angle').addEventListener('input', function () {
      const inputText = this.value;
      cameraAngleKeyword = inputText;
      updatePromptText();
    });
  }

  function cameraProperties() {
    layer[4].querySelectorAll(assetsBox).forEach(item => {
      item.addEventListener('click', function () {
        const keyword = item.querySelector(assetsType).textContent;
        cameraPropertiesKeyword = keyword;
        document.getElementById('camera_properties').value = cameraPropertiesKeyword;
        document.body.classList.remove(isFixed);
        layer.forEach(l => l.classList.remove(isActive));
        updatePromptText();
      });
    });

    document.getElementById('camera_properties').addEventListener('input', function () {
      const inputText = this.value;
      cameraPropertiesKeyword = inputText;
      updatePromptText();
    });
  }

  function filmTypes() {
    layer[5].querySelectorAll(assetsBox).forEach(item => {
      item.addEventListener('click', function () {
        const keyword = item.querySelector(assetsType).textContent;
        filmTypesKeyword = keyword;
        document.getElementById('film_types').value = filmTypesKeyword;
        document.body.classList.remove(isFixed);
        layer.forEach(l => l.classList.remove(isActive));
        updatePromptText();
      });
    });

    document.getElementById('film_types').addEventListener('input', function () {
      const inputText = this.value;
      filmTypesKeyword = inputText;
      updatePromptText();
    });
  }

  function lenses() {
    layer[6].querySelectorAll(assetsBox).forEach(item => {
      item.addEventListener('click', function () {
        const keyword = item.querySelector(assetsType).textContent;
        lensesKeyword = keyword;
        document.getElementById('lenses').value = lensesKeyword;
        document.body.classList.remove(isFixed);
        layer.forEach(l => l.classList.remove(isActive));
        updatePromptText();
      });
    });

    document.getElementById('lenses').addEventListener('input', function () {
      const inputText = this.value;
      lensesKeyword = inputText;
      updatePromptText();
    });
  }

  function filtersEffects() {
    layer[7].querySelectorAll(assetsBox).forEach(item => {
      item.addEventListener('click', function () {
        const keyword = item.querySelector(assetsType).textContent;
        filtersEffectsKeyword = keyword;
        document.getElementById('filters_effects').value = filtersEffectsKeyword;
        document.body.classList.remove(isFixed);
        layer.forEach(l => l.classList.remove(isActive));
        updatePromptText();
      });
    });

    document.getElementById('filters_effects').addEventListener('input', function () {
      const inputText = this.value;
      filtersEffectsKeyword = inputText;
      updatePromptText();
    });
  }

  function photographers() {
    layer[8].querySelectorAll(assetsBox).forEach(item => {
      item.addEventListener('click', function () {
        const keyword = item.querySelector(assetsType).textContent;
        photographersKeyword = keyword;
        document.getElementById('photographers').value = photographersKeyword;
        document.body.classList.remove(isFixed);
        layer.forEach(l => l.classList.remove(isActive));
        updatePromptText();
      });
    });

    document.getElementById('photographers').addEventListener('input', function () {
      const inputText = this.value;
      photographersKeyword = inputText;
      updatePromptText();
    });
  }

  function updatePromptText() {
    const textField = document.querySelector('.prompt_input'); 
  
    let promptArray = [];
  
    if (styleKeyword) {
      promptArray.push(styleKeyword + " photo of");
    }

    const remainingKeywords = [
      subjectKeyword ? ' ' + subjectKeyword : '',
      framingKeyword,
      backgroundKeyword,
      lightingKeyword,
      cameraAngleKeyword,
      cameraPropertiesKeyword,
      filmTypesKeyword,
      lensesKeyword,
      filtersEffectsKeyword,
      photographersKeyword ? 'in the style of ' + photographersKeyword : null
    ]
      .filter(Boolean) 
      .join(', ');    
  
    if (remainingKeywords) {
      if (!subjectKeyword || subjectKeyword.trim() === '') {
        promptArray.push(', ' + remainingKeywords);
      } else {
        promptArray.push(remainingKeywords);
      }
    }

    promptText = promptArray.join('').trim(); 
    textField.value = promptText;
  }  

  // 프롬프트 초기화
  function resetPrompt() {
    const resetButton = document.querySelector('.btn_prompt_reset');
  
    resetButton.addEventListener('click', function(event) {
      event.preventDefault();
  
      promptText = '';
      styleKeyword = '';
      subjectKeyword = '';
      framingKeyword = '';
      backgroundKeyword = '';
      lightingKeyword = '';
      cameraAngleKeyword = '';
      cameraPropertiesKeyword = '';
      filmTypesKeyword = '';
      lensesKeyword = '';
      filtersEffectsKeyword = '';
      photographersKeyword = '';
    });
  }
}











