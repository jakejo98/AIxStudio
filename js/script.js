$(document).ready(function(){
  settingShowHandler();
  settingSelectHandler();
  settingCloseHander();
  settingTextHandler();
  promptCheck();
})

function settingShowHandler(){
  const expandedBtn = ('.section_framer .framer .framer_prompt_area .btn_framer_setting_expanded');
  const settingBox = $('.section_framer .framer .framer_setting_area');
  const isActive = 'active';

  $(expandedBtn).click(function(){
    $(settingBox).toggleClass(isActive);
  })
}

function settingSelectHandler(){
  const btnSelect = $('.section_framer .framer .framer_setting_area .framer_setting_item .btn_setting_select');
  const selectItem = $('.section_framer .framer .framer_setting_area .framer_setting_item');
  const layer = $('.ly_pop_wrap')
  const isActive = 'active';

  $(btnSelect).click(function(){
    const selectId = $(this).closest(selectItem).index() - 2;
    $(layer).eq(selectId).addClass(isActive);
  })
}

function settingCloseHander(){
  const layer = $('.ly_pop_wrap');
  const btnClose = $('.ly_pop_wrap .btn_close_ly_pop');
  const isActive = 'active';

  $(btnClose).click(function(){
    $(layer).removeClass(isActive);
  })
}

function promptCheck(){
  const btnPrompt = $('.btn_framer_prompt');
  const textField = $('.framer_prompt_textarea');
  
  $(btnPrompt).click(function(){
    if($(textField).val() === '') {
      alert('입력란을 작성하세요.')
    }
  })
}

function settingTextHandler(){
  const layer = $('.ly_pop_wrap');
  const isActive = 'active';
  let promptText = '';
  let styleKeyword = '';
  let subjectKeyword = '';
  let framingKeyword = '';
  let settingBackgroundKeyword = '';
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
  settingBackgroundHandler();
  lightingHandler();
  cameraAngleHandler();
  cameraPropertiesHandler();
  filmTypesHandler();
  lensesHandler();
  filtersEffectsHandler();
  photographersHandler();

  function styleHandler(){
    const item = $('.ly_pop_wrap.style .ly_pop_img_item');
    const title = $('.ly_pop_wrap.style .ly_pop_img_item .img_title');
    // select
    $(item).click(function(){
      const keyword = $(this).find(title).text();
      styleKeyword = keyword;
      $('#setting_style').val(styleKeyword);
      $(layer).removeClass(isActive);
      updatePromptText();
    })
    // input 
    $('#setting_style').on('input', function(){
      let inputText = $(this).val() + " photo of";
      styleKeyword = inputText;
      updatePromptText();
    })
  }

  function subjectHandler(){
    // input
    $('#setting_subject').on('input', function(){
      let inputText = $(this).val();
      subjectKeyword = inputText;
      updatePromptText();
    })
  }

  function framingHandler(){
    // select
    const item = $('.ly_pop_wrap.framing .ly_pop_img_item');
    const title = $('.ly_pop_wrap.framing .ly_pop_img_item .img_title');
    $(item).click(function(){
      const keyword = $(this).find(title).text();
      framingKeyword = keyword;
      $('#setting_framing').val(framingKeyword);
      $(layer).removeClass(isActive);
      updatePromptText();
    })
    // input
    $('#setting_framing').on('input', function(){
      let inputText = $(this).val();
      framingKeyword = inputText;
      updatePromptText();
    })
  }

  function settingBackgroundHandler(){
    // input
    $('#setting_background').on('input', function(){
      let inputText = $(this).val();
      settingBackgroundKeyword = inputText;
      updatePromptText();
    })
  }

  function lightingHandler(){
    // select 
    const item = $('.ly_pop_wrap.lighting .ly_pop_img_item');
    const title = $('.ly_pop_wrap.lighting .ly_pop_img_item .img_title');
    $(item).click(function(){
      const keyword = $(this).find(title).text();
      lightingKeyword = keyword;
      $('#setting_lighting').val(lightingKeyword);
      $(layer).removeClass(isActive);
      updatePromptText();
    })
    // input 
    $('#setting_lighting').on('input', function(){
      let inputText = $(this).val();
      lightingKeyword = inputText;
      updatePromptText();
    })
  }

  function cameraAngleHandler(){
    // select 
    const item = $('.ly_pop_wrap.camera_angle .ly_pop_img_item');
    const title = $('.ly_pop_wrap.camera_angle .ly_pop_img_item .img_title');
    $(item).click(function(){
      const keyword = $(this).find(title).text();
      cameraAngleKeyword = keyword;
      $('#setting_camera_angle').val(cameraAngleKeyword);
      $(layer).removeClass(isActive);
      updatePromptText();
    })
    // input 
    $('#setting_camera_angle').on('input', function(){
      let inputText = $(this).val();
      cameraAngleKeyword = inputText;
      updatePromptText();
    })
  }

  function cameraPropertiesHandler(){
    // select 
    const item = $('.ly_pop_wrap.camera_properties .ly_pop_img_item');
    const title = $('.ly_pop_wrap.camera_properties .ly_pop_img_item .img_title');
    $(item).click(function(){
      const keyword = $(this).find(title).text();
      cameraPropertiesKeyword = keyword;
      $('#setting_camera_properties').val(cameraPropertiesKeyword);
      $(layer).removeClass(isActive);
      updatePromptText();
    })
    // input 
    $('#setting_camera_properties').on('input', function(){
      let inputText = $(this).val();
      cameraPropertiesKeyword = inputText;
      updatePromptText();
    })
  }

  function filmTypesHandler(){
    // select 
    const item = $('.ly_pop_wrap.film_types .ly_pop_img_item');
    const title = $('.ly_pop_wrap.film_types .ly_pop_img_item .img_title');
    $(item).click(function(){
      const keyword = $(this).find(title).text();
      filmTypesKeyword = keyword;
      $('#setting_film_types').val(filmTypesKeyword);
      $(layer).removeClass(isActive);
      updatePromptText();
    })
    // input 
    $('#setting_film_types').on('input', function(){
      let inputText = $(this).val();
      filmTypesKeyword = inputText;
      updatePromptText();
    })
  }

  function lensesHandler(){
    // select 
    const item = $('.ly_pop_wrap.lenses .ly_pop_img_item');
    const title = $('.ly_pop_wrap.lenses .ly_pop_img_item .img_title');
    $(item).click(function(){
      const keyword = $(this).find(title).text();
      lensesKeyword = keyword;
      $('#setting_lenses').val(lensesKeyword);
      $(layer).removeClass(isActive);
      updatePromptText();
    })
    // input 
    $('#setting_lenses').on('input', function(){
      let inputText = $(this).val();
      lensesKeyword = inputText;
      updatePromptText();
    })
  }

  function filtersEffectsHandler(){
    // select 
    const item = $('.ly_pop_wrap.filters_effects .ly_pop_img_item');
    const title = $('.ly_pop_wrap.filters_effects .ly_pop_img_item .img_title');
    $(item).click(function(){
      const keyword = $(this).find(title).text();
      filtersEffectsKeyword = keyword;
      $('#setting_filters_effects').val(filtersEffectsKeyword);
      $(layer).removeClass(isActive);
      updatePromptText();
    })
    // input 
    $('#setting_filters_effects').on('input', function(){
      let inputText = $(this).val();
      filtersEffectsKeyword = inputText;
      updatePromptText();
    })
  }

  function photographersHandler(){
    // select 
    const item = $('.ly_pop_wrap.photographers .ly_pop_img_item');
    const title = $('.ly_pop_wrap.photographers .ly_pop_img_item .img_title');
    $(item).click(function(){
      const keyword = $(this).find(title).text();
      photographersKeyword = keyword;
      $('#setting_photographers').val(photographersKeyword);
      $(layer).removeClass(isActive);
      updatePromptText();
    })
    // input 
    $('#setting_photographers').on('input', function(){
      let inputText = $(this).val();
      photographersKeyword = 'in the style of ' + inputText;
      updatePromptText();
    })
  }

  function updatePromptText() {
    const textField = $('.framer_prompt_textarea');
    
    // 순서를 유지하며 각 변수 처리
    let promptArray = [];

    // 1. styleKeyword는 공백으로 추가
    if (styleKeyword) {
        promptArray.push(styleKeyword + " photo of" + ' '); // styleKeyword 뒤에 공백 추가
    }

    // 2. 나머지 키워드들은 subjectKeyword와 함께 콤마로 구분해서 추가
    const remainingKeywords = [
      subjectKeyword, // subjectKeyword를 먼저 추가
      framingKeyword, 
      settingBackgroundKeyword, 
      lightingKeyword, 
      cameraAngleKeyword, 
      cameraPropertiesKeyword, 
      filmTypesKeyword, 
      lensesKeyword,
      filtersEffectsKeyword, 
      'in the style of ' + photographersKeyword
    ]
    .filter(Boolean) // 값이 있는 것만 필터링
    .join(', ');     // 콤마로 연결

    // remainingKeywords가 있으면 추가
    if (remainingKeywords) {
        promptArray.push(remainingKeywords);
    }

    // 모든 요소를 하나로 연결 (공백을 기준으로)
    promptText = promptArray.join('').trim(); // trim()으로 공백 제거

    // textField에 텍스트 설정
    $(textField).text(promptText);
  }



}
