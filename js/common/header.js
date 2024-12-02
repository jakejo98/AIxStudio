export function headerHandler(){
  rwdHandler();
}

function rwdHandler(){
  rwdHeaderGnb();
}
// 반응형 헤더 메뉴 활성화 / 비활성화
function rwdHeaderGnb(){
  const headerGnbBtn = $('.btn_header_gnb');
  const headerGnbCloseBtn = $('.btn_header_gnb_close');
  const headerGnbWrap = $('.header_inner.rwd .header_gnb_wrap');
  const headerGnb = $('.header_inner.rwd .header_gnb');
  const isActive = 'active';
  const isFixed = 'is-fixed'

  // 활성화
  $(headerGnbBtn).click(function(){
    $('body').addClass(isFixed);
    $(headerGnbWrap).addClass(isActive);
    setTimeout(function(){
      $(headerGnb).addClass(isActive);
    }, 100);
  })

  // 비활성화
  $(headerGnbCloseBtn).click(function(){
    $('body').removeClass(isFixed);
    $(headerGnb).removeClass(isActive);
    setTimeout(function(){
      $(headerGnbWrap).removeClass(isActive);
    }, 100)
  })
}
