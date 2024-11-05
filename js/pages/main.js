export function mainpageHandler(){
  commonHandler();
}

function commonHandler(){
  commonSetting();
  commonSettingPopup();
  commonGenerateTemplate();
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