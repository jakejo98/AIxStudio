export function mainpageHandler(){
  commonHandler();
}

function commonHandler(){
  commonSetting();
  commonSettingPopup();
  commonGenerateTemplate();
  // commonSettingTextInclude();
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

  // style
  function styleHandler(){
    // select
    $(layer).eq(0).find(assetsBox).click(function(){
      const keyword = $(this).find(assetsType).text();
      styleKeyword = keyword;
      $('#style').val(styleKeyword)
      $(layer).removeClass(isActive);
      console.log(styleKeyword)
    })
    // input 
    $('#style').on('input', function(){
      const inputText = $(this).val() + " photo of";
      styleKeyword = inputText;
      console.log(styleKeyword)
    })
  }
  // subject
  function subjectHandler(){
    // input
    $('#subject').on('input', function(){
      const inputText = $(this).val();
      subjectKeyword = inputText();
    })
  }
  // framing
  function framingHandler(){
    // select
    $(layer).eq(1).find(assetsBox).click(function(){
      const keyword = $(this).find(assetsType).text();
      framingKeyword = keyword;
      $('#framing').val(framingKeyword);
      $(layer).removeClass(isActive);
    })
    // input
    $('#framing').on('input', function(){
      const inputText = $(this).val();
      framingKeyword = inputText;
    })
  }
  // background
  function backgroundHandler(){
    // input
    $('#background').on('input', function(){
      const inputText = $(this).val();
      backgroundKeyword = inputText;
    })
  }
  // lighting
  function lightingHandler(){
    // select
    $(layer).eq(2).find(assetsBox).click(function(){
      const keyword = $(this).find(assetsType).text();
      lightingKeyword = keyword;
      $('#lighting').val(lightingKeyword);
      $(layer).removeClass(isActive);
    })
    // input
    $('#lighting').on('input', function(){
      const inputText = $(this).val();
      lightingKeyword = inputText;
    })
  }
  // camera angle
  function cameraAngleHandler(){
    // select
    $(layer).eq(3).find(assetsBox).click(function(){
      const keyword = $(this).find(assetsType).text();
      cameraAngleKeyword = keyword;
      $('#camera_angle').val(cameraAngleKeyword);
      $(layer).removeClass(isActive);
    })
    // input
    $('#camera_angle').on('input', function(){
      const inputText = $(this).val();
      cameraAngleKeyword = inputText;
    })
  }
  // c
}
// 이미지 생성 버튼
function commonGenerateTemplate(){
  const generateBtn = $('.btn_generate_image');
  const generateArea = $('.section_generate');

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
        <div class="generate_info">
          <p class="generate_info_prompt">
            This is test prompt
          </p>
          <time datetime="2024.11.04 17:00:00" class="generate_info_time">2024.11.04 17:00:00</time>  
        </div>
      </div>
    `;
    const generatePrompt = $('.generate_info_prompt');
    const generateTime = $('.generate_info_time');

    $(generateArea).append(generateGrid);
    $(generatePrompt).text('This is test prompt');
    $(generateTime).text('2024.11.04 17:00:00');
  })
}