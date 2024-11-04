export function mainpageHandler(){
  commonHandler();
}

function commonHandler(){
  commonSetting();
  commonSettingPopup();
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
  const popup = $('.ly_pop_wrap');
  const isActive = 'active';
  // 활성화
  $(isActiveSettingPopupBtn).click(function(){
    const btnIndex = $(this).closest(settingItem).index() - 2;
    $(popup).eq(btnIndex).addClass(isActive).siblings().removeClass(isActive);
  })

  const popupCloseBtn = $('.btn_ly_pop_close');
  // 비활성화
  $(popupCloseBtn).click(function(){
    $(popup).removeClass(isActive);
  })
}