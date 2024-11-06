export function mainpageHandler(){
  commonHandler();
  mobileHandler();
}

function commonHandler(){
  commonSetting();
  commonSettingPopup();
  commonGenerateTemplate();
  commonSettingTextInclude();
  commonUpdatePromptLine();
}

function mobileHandler(){
  mobileRemovePlaceholder();
}

// 프롬프트 설정 프롬프트 활성화
function commonSetting(){
  const isActiveSettingBtn = $('.btn_prompt_setting');
  const setting = $('.setting');
  const isActive = 'active';

  $(isActiveSettingBtn).click(function(event){
    event.preventDefault();
    $(setting).toggleClass(isActive);
  })
}
// 프롬프트 설정 팝업
function commonSettingPopup(){
  const settingItem = $('.setting_item');
  const isActiveSettingPopupBtn = $('.btn_setting_select');
  const popupCloseBtn = $('.btn_ly_pop_close');
  const popup = $('.ly_pop_wrap');
  const isActive = 'active';
  const isFixed = 'is-fixed';
  // 활성화
  $(isActiveSettingPopupBtn).click(function(){
    $('body').addClass(isFixed);
    const btnIndex = $(this).closest(settingItem).index() - 2;
    $(popup).eq(btnIndex).addClass(isActive).siblings().removeClass(isActive);
  })

  // 비활성화
  $(popupCloseBtn).click(function(){
    $('body').removeClass(isFixed);
    $(popup).removeClass(isActive);
  })
}
// 프롬프트 설정 팝업 예시 텍스트 삽입
function commonSettingTextInclude(){
  const layer = $('.ly_pop_wrap')
  const assetsBox = $('.ly_pop_wrap .ly_pop_assets_box');
  const assetsType = $('.ly_pop_wrap .ly_pop_assets_box .ly_pop_assets_type');
  const isActive = 'active';
  const isFixed = 'is-fixed';
  let promptText = '';
  let styleKeyword = '';
  let subjectKeyword = '';
  let framingKeyword = '';
  let backgroundKeyword = '';
  let lightingKeyword = '';
  let cameraAngleKeyword = '';
  let cameraPropertiesKeyword = ''
  let filmTypesKeyword = '';
  let lensesKeyword = ''
  let filtersEffectsKeyword = '';
  let photographersKeyword = ''
  
  styleHandler();
  subjectHandler();
  framingHandler();
  backgroundHandler();
  lightingHandler();
  cameraAngleHandler();
  cameraPropertiesHandler();
  filmTypesHandler();
  lensesHandler();
  filtersEffectsHandler();
  photographersHandler();

  // style
  function styleHandler(){
    // select
    $(layer).eq(0).find(assetsBox).click(function(){
      const keyword = $(this).find(assetsType).text();
      styleKeyword = keyword;
      $('#style').val(styleKeyword)
      $('body').removeClass(isFixed);
      $(layer).removeClass(isActive);
      updatePromptText();
    })
    // input 
    $('#style').on('input', function(){
      const inputText = $(this).val() + " photo of";
      styleKeyword = inputText;
      updatePromptText();
    })
  }
  // subject
  function subjectHandler(){
    // input
    $('#subject').on('input', function(){
      const inputText = $(this).val();
      subjectKeyword = inputText;
      updatePromptText();
    })
  }
  // framing
  function framingHandler(){
    // select
    $(layer).eq(1).find(assetsBox).click(function(){
      const keyword = $(this).find(assetsType).text();
      framingKeyword = keyword;
      $('#framing').val(framingKeyword);
      $('body').removeClass(isFixed);
      $(layer).removeClass(isActive);
      updatePromptText();
    })
    // input
    $('#framing').on('input', function(){
      const inputText = $(this).val();
      framingKeyword = inputText;
      updatePromptText();
    })
  }
  // background
  function backgroundHandler(){
    // input
    $('#background').on('input', function(){
      const inputText = $(this).val();
      backgroundKeyword = inputText;
      updatePromptText();
    })
  }
  // lighting
  function lightingHandler(){
    // select
    $(layer).eq(2).find(assetsBox).click(function(){
      const keyword = $(this).find(assetsType).text();
      lightingKeyword = keyword;
      $('#lighting').val(lightingKeyword);
      $('body').removeClass(isFixed);
      $(layer).removeClass(isActive);
      updatePromptText();
    })
    // input
    $('#lighting').on('input', function(){
      const inputText = $(this).val();
      lightingKeyword = inputText;
      updatePromptText();
    })
  }
  // camera angle
  function cameraAngleHandler(){
    // select
    $(layer).eq(3).find(assetsBox).click(function(){
      const keyword = $(this).find(assetsType).text();
      cameraAngleKeyword = keyword;
      $('#camera_angle').val(cameraAngleKeyword);
      $('body').removeClass(isFixed);
      $(layer).removeClass(isActive);
      updatePromptText();
    })
    // input
    $('#camera_angle').on('input', function(){
      const inputText = $(this).val();
      cameraAngleKeyword = inputText;
      updatePromptText();
    })
  }
  // camera properties
  function cameraPropertiesHandler(){
    // select
    $(layer).eq(4).find(assetsBox).click(function(){
      const keyword = $(this).find(assetsType).text();
      cameraPropertiesKeyword = keyword;
      $('#camera_properties').val(cameraPropertiesKeyword);
      $('body').removeClass(isFixed);
      $(layer).removeClass(isActive)
      updatePromptText();
    })
    // input
    $('#camera_properties').on('input', function(){
      const inputText = $(this).val();
      cameraAngleKeyword = inputText;
      updatePromptText();
    })
  }
  // film types
  function filmTypesHandler(){
    // select
    $(layer).eq(5).find(assetsBox).click(function(){
      const keyword = $(this).find(assetsType).text();
      filmTypesKeyword = keyword;
      $('#film_types').val(filmTypesKeyword);
      $('body').removeClass(isFixed);
      $(layer).removeClass(isActive)
      updatePromptText();
    })
    // input
    $('#film_types').on('input', function(){
      const inputText = $(this).val();
      filmTypesKeyword = inputText;
      updatePromptText();
    })
  }
  // lenses
  function lensesHandler(){
    // select
    $(layer).eq(6).find(assetsBox).click(function(){
      const keyword = $(this).find(assetsType).text();
      lensesKeyword = keyword;
      $('#lenses').val(lensesKeyword);
      $('body').removeClass(isFixed);
      $(layer).removeClass(isActive);
      updatePromptText();
    })
    // input
    $('#lenses').on('input', function(){
      const inputText = $(this).val();
      lensesKeyword = inputText;
      updatePromptText();
    })
  }
  // filters effects
  function filtersEffectsHandler(){
    // select
    $(layer).eq(7).find(assetsBox).click(function(){
      const keyword = $(this).find(assetsType).text();
      filtersEffectsKeyword = keyword;
      $('#filters_effects').val(filtersEffectsKeyword);
      $('body').removeClass(isFixed);
      $(layer).removeClass(isActive);
      updatePromptText();
    })
    // input
    $('#filters_effects').on('input', function(){
      const inputText = $(this).val();
      filtersEffectsKeyword = inputText;
      updatePromptText();
    })
  }
  // photographers
  function photographersHandler(){
    // select
    $(layer).eq(8).find(assetsBox).click(function(){
      const keyword = $(this).find(assetsType).text();
      photographersKeyword = keyword;
      $('#photographers').val(photographersKeyword);
      $('body').removeClass(isFixed);
      $(layer).removeClass(isActive)
      updatePromptText();
    })
    // input
    $('#photographers').on('input', function(){
      const inputText = $(this).val();
      photographersKeyword = 'in the style of ' + inputText;
      updatePromptText();
    })
  }
  // prompt
  function updatePromptText() {
    const textField = $('.prompt_input');
    
    // 순서를 유지하며 각 변수 처리
    let promptArray = [];

    // 1. styleKeyword
    if(styleKeyword) {
      promptArray.push(styleKeyword + " photo of");
    }

    // 2. 나머지 키워드 처리
    const remainingKeywords = [
      subjectKeyword ? ' ' + subjectKeyword : '', // subjectKeyword가 없으면 공백, 있으면 추가
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
    .filter(Boolean) // 값이 있는 것만 필터링
    .join(', ');     // 콤마로 연결

    // remainingKeywords가 있으면 추가
    if (remainingKeywords) {
        // subjectKeyword가 없으면 바로 콤마 추가
        if (!subjectKeyword || subjectKeyword.trim() === '') {
            promptArray.push(', ' + remainingKeywords);
        } else {
            promptArray.push(remainingKeywords);
        }
    }

    // 모든 요소를 하나로 연결 (공백을 기준으로)
    promptText = promptArray.join('').trim(); // trim()으로 공백 제거
    // textField에 텍스트 설정
    $(textField).val(promptText)
  }
}
// 이미지 생성 버튼
function commonGenerateTemplate(){
  const generateBtn = $('.btn_generate_image');
  const generateArea = $('.section_generate');
  const section = $('.section_generate');
  const isActive = 'active';
  $(generateBtn).click(function(){
    const generateGrid = `
      <div class="generate">
        <div class="generate_grid">
          <ul class="generate_grid_list">
            <li class="generate_grid_item">
              <div class="generate_grid_box"></div>
            </li>
            <li class="generate_grid_item">
              <div class="generate_grid_box"></div>
            </li>
            <li class="generate_grid_item">
              <div class="generate_grid_box"></div>
            </li>
            <li class="generate_grid_item">
              <div class="generate_grid_box"></div>
            </li>
          </ul>
        </div>
      </div>
    `;
    const generatePrompt = $('.generate_info_prompt');
    const generateTime = $('.generate_info_time');

    $(generateArea).append(generateGrid);
    $(generatePrompt).text('This is test prompt');
    $(generateTime).text('2024.11.04 17:00:00');

    // section_generate가 active 클래스가 없는 경우에만 active 클래스 추가
    if(!$(section).hasClass(isActive)){
      $(section).addClass(isActive);
    }
  })
}

// 프롬프트 텍스트 내용에 따라 높이값 변화
function commonUpdatePromptLine() {
  const input = $('.prompt_input');

  // 초기 높이 및 너비 값 설정
  const initHeight = $(input).outerHeight(); // 초기 높이값
  const initWidth = $(input).width(); // 초기 너비값
  const lineHeight = parseInt($(input).css('line-height'), 10); // line-height 값 가져오기 (px)

  // 텍스트를 측정하는 캔버스 생성
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');

  // 입력 필드의 폰트 스타일 가져오기
  const font = $(input).css('font');
  context.font = font;

  // 텍스트 높이 및 너비 계산 함수
  function updateHeightAndWidth() {
    const text = $(input).val(); // 입력된 텍스트

    // 텍스트 내용이 비었을 때 초기 높이로 되돌리기
    if (text === '') {
      $(input).css('height', initHeight + 'px');
      return;
    }

    let lines = 1; // 초기 줄 수
    let line = '';
    let textWidth = 0;

    // 각 단어를 처리하며 텍스트 너비 측정
    const words = text.split(' '); // 텍스트를 공백 기준으로 단어 분리
    words.forEach(word => {
      const checkLine = line + word + ' '; // 현재 라인에 단어 추가
      const checkWidth = context.measureText(checkLine).width; // 텍스트 너비 측정

      // 줄의 너비가 입력 필드의 너비를 초과하면 줄바꿈
      if (checkWidth > initWidth) {
        lines++; // 줄 수 증가
        line = word + ' '; // 새로운 줄 시작
      } else {
        line = checkLine; // 현재 줄에 단어 추가
      }
    });

    // 최종 높이 계산: 처음 높이에 lineHeight만큼 곱한 값을 더하여 최종 높이 설정
    const updateHeight = initHeight + (lines - 1) * lineHeight;
    $(input).css('height', updateHeight + 'px'); // 높이 업데이트
  }

  // 텍스트 입력 시마다 높이 및 너비 계산
  $(input).on('input', function() {
    updateHeightAndWidth(); // 실시간으로 높이 및 너비 계산
  });

  // 붙여넣기 시 공백 제거
  $(input).on('paste', function(event) {
    const pasteData = event.originalEvent.clipboardData.getData('text');
    const cleanedText = pasteData.replace(/\s+/g, ' ').trim();
    event.preventDefault(); // 기본 붙여넣기 동작 취소
    document.execCommand('insertText', false, cleanedText); // 클린 텍스트 삽입

    // 붙여넣기 후 텍스트 높이 및 너비 계산
    setTimeout(updateHeightAndWidth, 0); // 비동기적으로 처리
  });

  // Enter 키를 눌렀을 때 기본 동작 방지
  $(input).on('keydown', function(event) {
    if (event.key === 'Enter') {
      event.preventDefault(); // Enter 키 기본 동작 방지
    }
  });
}





// 모바일 환경에서 prompt placeholder 삭제
function mobileRemovePlaceholder(){
  const input = $('.prompt_input');

  function updatePlaceholder(){
    if($(window).width() < 768){
      $(input).removeAttr('placeholder');
    } else {
      $(input).attr('placeholder', 'Search the world\'s best creative photos and images');
    }
  }
  updatePlaceholder();

  $(window).resize(function(){
    updatePlaceholder();
  })
}






  
  




