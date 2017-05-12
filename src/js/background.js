chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  chrome.contentSettings.javascript.get({
    primaryUrl: 'http://k2r29fjafjsdfjlj2qf39fqjasdlfkajsdlfkff49fdas'
  }, details => {
    const isAllowJS = details.setting === 'allow';
    chrome.browserAction.setIcon({
      path: `../images/icon-${isAllowJS ? '' : 'block-'}32.png`
    });
  });
});