'use strict';

(function () {
  var showMessage = function showMessage(message) {
    document.querySelector('.result').innerHTML = message;
  };

  return new Promise(function (resolve, reject) {
    chrome.contentSettings.javascript.get({
      primaryUrl: 'http://k2r29fjafjsdfjlj2qf39fqjasdlfkajsdlfkff49fdas'
    }, function (details) {
      resolve(details);
    });
  }).then(function (details) {
    return new Promise(function (resolve, reject) {
      var isAllowJS = details.setting === 'allow';
      chrome.contentSettings.javascript.set({
        setting: isAllowJS ? 'block' : 'allow',
        primaryPattern: '<all_urls>'
      }, function () {
        resolve(isAllowJS);
      });
    });
  }).then(function (isAllowJS) {
    chrome.runtime.sendMessage('changed');

    showMessage('JavaScript was turned <strong>' + (isAllowJS ? 'OFF' : 'ON') + '</strong>.');

    chrome.tabs.reload();
  });
})();