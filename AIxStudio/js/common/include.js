export function loadFile(callback) {
  let elementsLoaded = 0;

  let totalElementsToLoad = 0;

  function loadIfExists(selector, url) {
    const element = $(selector);
    if (element.length) {
      totalElementsToLoad++;
      element.load(url, function(response, status, xhr) {
        if (status === "error") {
          console.error(`${selector} 로딩 오류:`, xhr.statusText);
        } else {
          element.contents().unwrap();
          checkCompletion();
        }
      });
    }
  }

  function checkCompletion() {
    elementsLoaded++;
    if (elementsLoaded === totalElementsToLoad && typeof callback === 'function') {
      callback();
    }
  }

  loadIfExists('#header', 'html/header.html');
  loadIfExists('#footer', 'html/footer.html');
}