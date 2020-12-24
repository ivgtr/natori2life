chrome.tabs.onActivated.addListener((_) => {
  chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tab) => {
    if (
      tab[0].status === 'loading' &&
      (tab[0].pendingUrl === 'chrome://newtab/' || tab[0].url === 'chrome://newtab/')
    ) {
      const audio = new Audio()
      audio.src = chrome.extension.getURL('/voice/new-tab.mp3')
      audio.play()
    }
  })
})
