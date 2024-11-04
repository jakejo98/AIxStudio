import { loadFile } from "./common/include.js";
import { mainpageHandler } from "./pages/main.js";

$(document).ready(function(){
  loadFile(function(){
    mainpageHandler();
  })
})