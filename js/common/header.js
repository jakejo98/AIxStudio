export function header(){
  themeControl();
}

function themeControl() {
  let isDark = false; // 초기값 설정

  toggleBtn();

  function toggleBtn(){
    const themeBtn = $('.btn_theme');
    const isActive = 'active';

    $(themeBtn).click(function(){
      if($(this).hasClass(isActive)){
        $(this).removeClass(isActive).siblings().addClass(isActive);
      }
      isDark = !isDark;
      toggleContainer();
      toggleLogo();
      togglePromptIcon();
    })
  }

  function toggleContainer(){
    const wrap = $('.common_container.main_page');
    const darkMode = 'dark'

    if(isDark){
      $(wrap).addClass(darkMode);
    } else {
      $(wrap).removeClass(darkMode);
    }
  }

  function toggleLogo(){
    const logo = $('.logo_wrap .common_icon');
    const logoBlack = 'icon_logo_black';
    const logoWhite = 'icon_logo_white';

    if(isDark){
      $(logo).removeClass(logoBlack).addClass(logoWhite);
    } else {
      $(logo).removeClass(logoWhite).addClass(logoBlack);
    }
  }

  function togglePromptIcon(){
    const promptBtnIcon = $('.btn_prompt_setting .common_icon');
    const generateBtnIcon = $('.btn_generate_image .common_icon');
    const promptBtnIconBlack = 'icon_prompt_setting_black';
    const promptBtnIconWhite = 'icon_prompt_setting_white'
    const generateBtnIconBlack = 'icon_generate_image_black';
    const generateBtnIconWhite = 'icon_generate_image_white';

    if(isDark){
      $(promptBtnIcon).removeClass(promptBtnIconBlack).addClass(promptBtnIconWhite);
      $(generateBtnIcon).removeClass(generateBtnIconBlack).addClass(generateBtnIconWhite);
    } else {
      $(promptBtnIcon).removeClass(promptBtnIconWhite).addClass(promptBtnIconBlack);
      $(generateBtnIcon).removeClass(generateBtnIconWhite).addClass(generateBtnIconBlack);
    }
  }
}



