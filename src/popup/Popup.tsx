import React, { useEffect, useState } from 'react'
import './Popup.scss'

declare global {
  interface Window {
    io: SocketIOClientStatic
  }
}

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
  const [liveData, setLiveData] = useState<liveData[]>([])
  const [tabIndex, setTabIndex] = useState(0)
  useEffect(() => {
    chrome.runtime.sendMessage({ popupMounted: true }, (index) => {
      setTabIndex(index)
    })
    const data = async () => {
      await fetch(
        'https://script.google.com/macros/s/AKfycbxSsBb1T0Mb46CCY3SsCl_d0lNtgngiy2kDGlULqU9Cz8oVfbMj/exec',
        {
          method: 'GET'
        }
      )
        .then((response) => response.json())
        .then((data) => {
          setLoading(false)
          if (data.status === 200) {
            setLiveData(data.data)
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

  return (
    <div className="popupContainer">
      {loading ? (
        <p>loadなう</p>
      ) : liveData.length > 0 ? (
        liveData.map((data) => {
          return (
            <div key={data.id} className="contents">
              <a
                onClick={() => {
                  openLivePage(data.url)
                }}
              >
                <div className="thumbnail">
                  <img src={data.thumbnail} alt={data.title} />
                </div>
                <div className="description">
                  <h3>{data.title}</h3>
                  <p>{data.description}</p>
                </div>
              </a>
            </div>
          )
        })
      ) : (
        <p>データがないよ</p>
      )}
    </div>
  )
}
