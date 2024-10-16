$(document).ready(function(){
  settingShowHandler();
  settingSelectHandler();
  settingCloseHander();
  settingTextHandler();
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

function settingTextHandler(){
  let promptText = '';
  let styleKeyword = '';
  let frma
  styleHandler();
  framingHandler();

  function styleHandler(){
    const item = $('.ly_pop_wrap.style .ly_pop_img_item');
    const title = $('.ly_pop_wrap.style .ly_pop_img_item .img_title');
    $(item).click(function(){
      const keyword = $(this).find(title).text();
      const appendKeyword = keyword + " photo of";
      promptText += appendKeyword;
    })
  }

  function  framingHandler(){
    const item = $('.ly_pop_wrap.framing .ly_pop_img_item');
    const title = $('.ly_pop_wrap.framing .ly_pop_img_item .img_title');
    $(item).click(function(){
      const keyword = $(this).find(title).text();
    })
  }
}
