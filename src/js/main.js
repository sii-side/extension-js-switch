(() => {
  const showMessage = message => {
    document.querySelector('.result').innerHTML = message;
  };

  /**
   * (1) get
   * (2) set
   * (3) icon・popup・reload
   */
  return new Promise((resolve, reject) => {  //(1)
    chrome.contentSettings.javascript.get({
      //globalの設定をgetするためあり得ないURLにする
      // - 例外設定に該当するURLがあるとそちらの設定をgetしてしまう
      // - patternではないので <all_urls> や * は使えない
      primaryUrl: 'http://k2r29fjafjsdfjlj2qf39fqjasdlfkajsdlfkff49fdas'
    }, details => {
      resolve(details);
    });
  }).then(details => {
    return new Promise((resolve, reject) => {  //(2)
      const isAllowJS = details.setting === 'allow';
      chrome.contentSettings.javascript.set({
        setting: isAllowJS ? 'block' : 'allow',
        primaryPattern: '<all_urls>'
      }, () => {
        resolve(isAllowJS);
      });
    });
  }).then(isAllowJS => {  //(3)
    //アイコンの変更を促す
    chrome.runtime.sendMessage('changed');
    //popupにメッセージ表示
    showMessage(`JavaScript was turned <strong>${isAllowJS ? 'OFF' : 'ON'}</strong>.`);
    //current tabのreload
    chrome.tabs.reload();
  });
})();