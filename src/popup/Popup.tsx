import React, { useEffect, useState } from 'react'
import './reset.scss'
import './Popup.scss'

const dummy = [
  {
    id: 'a',
    url: 'https://i.ytimg.com/vi/egnnzp19Sqw/hqdefault_live.jpg',
    thumbnail: 'https://img.youtube.com/vi/swpaOrubkT0/mqdefault.jpg',
    title: 'さなちゃんねるサムネイル選手権！～雑振り返りを添えて～',
    description:
      '【企画内容】 Twitterのハッシュタグ #人間以外動物家族描いて名取 にて募集した同居ご家族動物の写真を絵にしていく！ 眠くなったら終了！バブちゃんなので… （最初6 ...',
    state: 'upcoming',
    channelTitle: 'a',
    channelId: 'a'
  },
  {
    id: 'b',
    url: 'https://i.ytimg.com/vi/egnnzp19Sqw/hqdefault_live.jpg',
    thumbnail: 'https://img.youtube.com/vi/swpaOrubkT0/mqdefault.jpg',
    title: 'さなちゃんねるサムネイル選手権！～雑振り返りを添えて～',
    description:
      '【企画内容】 Twitterのハッシュタグ #人間以外動物家族描いて名取 にて募集した同居ご家族動物の写真を絵にしていく！ 眠くなったら終了！バブちゃんなので… （最初6 ...',
    state: 'none',
    channelTitle: 'a',
    channelId: 'a'
  },
  {
    id: 'c',
    url: 'https://i.ytimg.com/vi/egnnzp19Sqw/hqdefault_live.jpg',
    thumbnail: 'https://img.youtube.com/vi/swpaOrubkT0/mqdefault.jpg',
    title: 'さなちゃんねるサムネイル選手権！～雑振り返りを添えて～',
    description:
      '【企画内容】 Twitterのハッシュタグ #人間以外動物家族描いて名取 にて募集した同居ご家族動物の写真を絵にしていく！ 眠くなったら終了！バブちゃんなので… （最初6 ...',
    state: 'none',
    channelTitle: 'a',
    channelId: 'a'
  },
  {
    id: 'd',
    url: 'https://i.ytimg.com/vi/egnnzp19Sqw/hqdefault_live.jpg',
    thumbnail: 'https://img.youtube.com/vi/swpaOrubkT0/mqdefault.jpg',
    title: 'さなちゃんねるサムネイル選手権！～雑振り返りを添えて～',
    description:
      '【企画内容】 Twitterのハッシュタグ #人間以外動物家族描いて名取 にて募集した同居ご家族動物の写真を絵にしていく！ 眠くなったら終了！バブちゃんなので… （最初6 ...',
    state: 'none',
    channelTitle: 'a',
    channelId: 'a'
  },
  {
    id: 'e',
    url: 'https://i.ytimg.com/vi/egnnzp19Sqw/hqdefault_live.jpg',
    thumbnail: 'https://img.youtube.com/vi/swpaOrubkT0/mqdefault.jpg',
    title: 'さなちゃんねるサムネイル選手権！～雑振り返りを添えて～',
    description:
      '【企画内容】 Twitterのハッシュタグ #人間以外動物家族描いて名取 にて募集した同居ご家族動物の写真を絵にしていく！ 眠くなったら終了！バブちゃんなので… （最初6 ...',
    state: 'none',
    channelTitle: 'a',
    channelId: 'a'
  }
]

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
  const [liveDataList, setLiveDataList] = useState<liveData[]>([])
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
    // setTimeout(() => {
    //   setLoading(false)
    //   setLiveDataList(dummy)
    // }, 1000)
  }, [])

  const openLivePage = (url: string) => {
    chrome.tabs.create({
      index: tabIndex + 1,
      url,
      selected: true
    })
  }

  return (
    <div className="popupWrapper">
      <div className="popupContainer">
        {loading ? (
          <p>loadなう</p>
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
                    <p className="popupLabel">次の配信予定</p>
                  ) : (
                    liveData.state === 'live' && <p className="popupLabel">現在配信中</p>
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
