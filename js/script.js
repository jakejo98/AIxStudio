// header, footer 템플릿
import { loadFile } from "./common/include.js";
// header.js
import { header } from "./common/header.js";

// prompt.js
import { prompt } from "./components/prompt.js";
// promptSetting.js
import { promptSetting } from "./components/promptSetting.js";
// workflowSetting.js
import { workflowSetting } from "./components/workflowSetting.js";


// 공통 함수
$(document).ready(function(){
  loadFile(function(){
    header();
    prompt();
    promptSetting();
    workflowSetting();
  });
});