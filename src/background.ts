chrome.tabs.onActivated.addListener((_) => {
  chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tab) => {
    if (tab[0].pendingUrl === 'chrome://newtab/') {
      const audio = new Audio()
      audio.src = chrome.extension.getURL('/voice/new-tab.mp3')
      audio.play()
    }
  })
})
