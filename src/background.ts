chrome.tabs.onActivated.addListener((_) => {
  chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tab) => {
    if (
      tab[0].status === 'loading' &&
      (tab[0].pendingUrl === 'chrome://newtab/' || tab[0].url === 'chrome://newtab/')
    ) {
      const num = Math.floor(Math.random() * 4) + 1
      const audio = new Audio()
      audio.src = chrome.extension.getURL(`/voice/new-tab-${num}.mp3`)
      audio.play()
    }
  })
})

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
    const { index } = tabs[0]
    sendResponse(index)
  })
  return true
})
