function promptAdjustHeight() {
    function adjustHeight(element) {
      const style = window.getComputedStyle(element);
      const lineHeight = parseFloat(style.lineHeight) || 0;
      const paddingTop = parseFloat(style.paddingTop) || 0;
      const paddingBottom = parseFloat(style.paddingBottom) || 0;
      const borderTop = parseFloat(style.borderTopWidth) || 0;
      const borderBottom = parseFloat(style.borderBottomWidth) || 0;
  
      const baseHeight = lineHeight + paddingTop + paddingBottom + borderTop + borderBottom;
  
      element.style.height = 'auto';
      element.style.height = `${Math.max(element.scrollHeight, baseHeight)}px`;
    }
  
    document.querySelectorAll('.prompt_input').forEach(function (element) {
      element.addEventListener('input', function () {
        adjustHeight(element);
      });
    });
  
    document.querySelectorAll('.prompt_input').forEach(function (element) {
      adjustHeight(element);
    });
  
    document.querySelectorAll('.ly_pop_assets_box').forEach(function (box) {
      box.addEventListener('click', function () {
        setTimeout(function () {
          document.querySelectorAll('.prompt_input').forEach(function (element) {
            adjustHeight(element);
          });
        }, 0);
      });
    });
  
    document.querySelectorAll('.prompt_setting_input').forEach(function (input) {
      input.addEventListener('input', function () {
        document.querySelectorAll('.prompt_input').forEach(function (element) {
          adjustHeight(element);
        });
      });
    });
  
    window.addEventListener('resize', function () {
      document.querySelectorAll('.prompt_input').forEach(function (element) {
        adjustHeight(element);
      });
    });
  }