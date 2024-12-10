// header, footer 템플릿
import { loadFile } from "/AIxStudio/js/common/include.js";
// header.js
import { header } from "/AIxStudio/js/common/header.js";
// prompt.js
import { prompt } from "/AIxStudio/js/components/prompt.js";
// promptSetting.js
import { promptSetting } from "/AIxStudio/js/components/promptSetting.js";
// workflowSetting.js
import { workflowSetting } from "/AIxStudio/js/components/workflowSetting.js";


// 공통 함수
$(document).ready(function(){
  loadFile(function(){
    header();
    prompt();
    promptSetting();
    workflowSetting();
  });
});