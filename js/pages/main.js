export function mainpageHandler(){
  commonHandler();
  mobileHandler();
  desktopHandler();
}

function commonHandler(){
  commonSetting();
  commonSettingPopup();
  commonSettingTextInclude();
  commonUpdatePromptAdjust();
  commonWorkflowHandler();
  commonProgressTextEffects();
}

function mobileHandler(){
  mobileRemovePlaceholder();
}

function desktopHandler(){
  desktopHorizontalScroll();
}

// 프롬프트 설정 프롬프트 활성화
function commonSetting(){
  const isActiveSettingBtn = $('.btn_prompt_setting');
  const setting = $('.section_prompt_setting');
  const isActive = 'active';

  $(isActiveSettingBtn).click(function(event){
    event.preventDefault();
    $(setting).toggleClass(isActive);
  })
}
// 프롬프트 설정 팝업
function commonSettingPopup(){
  const settingItem = $('.prompt_setting_item');
  const isActiveSettingPopupBtn = $('.btn_prompt_setting_select');
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

// 프롬프트 텍스트 내용에 따라 높이값 변화
function commonUpdatePromptAdjust() {
  // 높이 조정을 처리하는 함수
  function adjustHeight(element) {
    const style = window.getComputedStyle(element);
    const lineHeight = parseFloat(style.lineHeight) || 0;
    const paddingTop = parseFloat(style.paddingTop) || 0;
    const paddingBottom = parseFloat(style.paddingBottom) || 0;
    const borderTop = parseFloat(style.borderTopWidth) || 0;
    const borderBottom = parseFloat(style.borderBottomWidth) || 0;

    // 기본 높이 계산: 한 줄 높이 + 패딩 + 보더
    const baseHeight = lineHeight + paddingTop + paddingBottom + borderTop + borderBottom;

    // 높이를 auto로 초기화한 후 scrollHeight로 조정
    element.style.height = 'auto';
    element.style.height = `${Math.max(element.scrollHeight, baseHeight)}px`;
  }

  // .prompt_input에서 입력 시 높이 조정
  $('.prompt_input').on('input', function () {
    adjustHeight(this);
  });

  // 페이지 로드 시 초기 높이 설정
  $('.prompt_input').each(function () {
    adjustHeight(this);
  });

  // assets 클릭 시 높이 조정
  $('.ly_pop_assets_box').click(function(){
    $('.prompt_input').each(function(){
      adjustHeight(this);
    })
  });

  // prompt_setting_input 입력시 높이 조정
  $('.prompt_setting_input').on('input', function(){
    $('.prompt_input').each(function(){
      adjustHeight(this);
    })
  });

  // 윈도우 리사이즈 시 높이 재조정
  $(window).on('resize', function () {
    $('.prompt_input').each(function () {
      adjustHeight(this);
    });
  });
}

// 모바일 환경에서 prompt placeholder 삭제
function mobileRemovePlaceholder(){
  const input = $('.prompt_input');

  function updatePlaceholder(){
    if($(window).width() < 768){
      $(input).attr('placeholder', 'Search');
      // $(input).removeAttr('placeholder');
    } else {
      $(input).attr('placeholder', 'Search the world\'s best creative photos and images');
    }
  }
  updatePlaceholder();

  $(window).resize(function(){
    updatePlaceholder();
  })
}

// 워크플로우 셋팅
function commonWorkflowHandler(){
  const workflowBtn = $('.btn_workflow_setting');
  const isActive = "active";

  $(workflowBtn).click(function(){
    if($(this).hasClass(isActive)){
      $(this).removeClass(isActive)
    } else {
      $(this).addClass(isActive);
      $(this).parent().siblings().find(workflowBtn).removeClass(isActive);
    }
  })
}

// section_workflow_setting horizontal scroll event
function desktopHorizontalScroll() {
  const element = document.querySelector('.section_workflow_setting');
  if (element) {
    element.addEventListener('wheel', function (e) {
      const delta = e.deltaY; // 마우스 휠 위/아래 방향 값
      element.scrollLeft += delta; // 가로 스크롤 이동
    }, { passive: true }); // passive 옵션 추가
  }
}




