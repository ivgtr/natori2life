import React, { useEffect, useState } from 'react'
import './reset.scss'
import './Popup.scss'

const url =
  'https://script.google.com/macros/s/AKfycbxSsBb1T0Mb46CCY3SsCl_d0lNtgngiy2kDGlULqU9Cz8oVfbMj/exec'

type liveData = {
  id: string
  url: string
  thumbnail: string
  title: string
  description: string
  state: string
  channelTitle: string
  channelId: string
}

export default function Popup() {
  const [loading, setLoading] = useState(true)
  const [liveDataList, setLiveDataList] = useState<liveData[]>([])
  const [tabIndex, setTabIndex] = useState(0)
  useEffect(() => {
    chrome.runtime.sendMessage({ popupMounted: true }, (index) => {
      setTabIndex(index)
    })
    const data = async () => {
      await fetch(url, {
        method: 'GET'
      })
        .then((response) => response.json())
        .then((data) => {
          setLoading(false)
          if (data.status === 200) {
            setLiveDataList(data.data)
          } else {
            throw data.message
          }
        })
        .catch((error) => {
          alert(error)
        })
    }
    data()
  }, [])

  const openLivePage = (url: string) => {
    chrome.tabs.create({
      index: tabIndex + 1,
      url,
      selected: true
    })
  }

  const styles = {
    backgroundImage: `url(${chrome.extension.getURL(`/image/sana-bg.png`)})`,
    backgroundRepeat: 'repeat',
    backgroundSize: '64px 64px'
  }

  return (
    <div className="popupWrapper" style={styles}>
      <div className="popupContainer">
        {loading ? (
          <div className="popupLoad">
            <p className="popupLoadDescription">茄子娘回診中</p>
            <div className="popupLoadImages">
              <img
                className="popupLoadImage"
                src={chrome.extension.getURL(`/image/ahe-ebi.png`)}
                alt="アヘエビ"
              />
              <img
                className="popupLoadImage"
                src={chrome.extension.getURL(`/image/ahe-ebi.png`)}
                alt="アヘエビ"
              />
              <img
                className="popupLoadImage"
                src={chrome.extension.getURL(`/image/ahe-ebi.png`)}
                alt="アヘエビ"
              />
            </div>
          </div>
        ) : liveDataList.length > 0 ? (
          <ul className="popupList">
            {liveDataList.map((liveData) => {
              return (
                <li
                  key={liveData.id}
                  className={[
                    'popupListItem',
                    liveData.state === 'upcoming'
                      ? 'popupUpcoming'
                      : liveData.state === 'live'
                      ? 'popupLive'
                      : 'popupCompleted'
                  ].join(' ')}
                >
                  {liveData.state === 'upcoming' ? (
                    <p className="popupLabel">さなちゃんねる coming soon...</p>
                  ) : (
                    liveData.state === 'live' && (
                      <p className="popupLabel">さなちゃんねる live now!</p>
                    )
                  )}
                  <a
                    onClick={() => {
                      openLivePage(liveData.url)
                    }}
                    className="popupListItemCard"
                  >
                    <div className="popupThumbnail">
                      <img src={liveData.thumbnail} alt={liveData.title} />
                    </div>
                    <div className="popupDescription">
                      <h3>{liveData.title}</h3>
                      <p>{liveData.description}</p>
                    </div>
                  </a>
                </li>
              )
            })}
          </ul>
        ) : (
          <div className="popupNone">
            <p className="popupNoneDescription">データがないよ</p>
            <img
              className="popupNoneImage"
              src={chrome.extension.getURL(`/image/sana-enen.png`)}
              alt="さなえんえん"
            />
          </div>
        )}
      </div>
    </div>
  )
}
