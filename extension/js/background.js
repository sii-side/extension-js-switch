'use strict';

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  chrome.contentSettings.javascript.get({
    primaryUrl: 'http://k2r29fjafjsdfjlj2qf39fqjasdlfkajsdlfkff49fdas'
  }, function (details) {
    var isAllowJS = details.setting === 'allow';
    chrome.browserAction.setIcon({
      path: '../images/icon-' + (isAllowJS ? '' : 'block-') + '32.png'
    });
  });
});