"use client"
import { useState } from 'react'
import { illustrationsList} from './data'
import Modal from './modal';

export default function Home() {
  // state
  const [index, setIndex] = useState(0);
  const [showMore, setShowMore] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalName, setModalName] = useState("");
  const [modalArtist, setModalArtist] = useState("");
  const [modalDescription, setModalDescription] = useState("");
  const [modalUrl, setModalUrl] = useState("");
  const [modalAlt, setModalAlt] = useState("");

  // アーティスト名で検索されたイラストリスト
  let searchedIllustList = illustrationsList.filter((illust)=> illust.artist === searchText);

  // イラスト情報
  let illustration = illustrationsList[index];
  let searchedIllust = searchedIllustList[index];

  // 次の画像があるかの有無
  const hasNext = index < illustrationsList.length - 1;
  const searchedHasNext = index < searchedIllustList.length -1;

  // 登録されたアーティスト情報
  const registeredArtist = illustrationsList.map((illustration) => illustration.artist);
  const regiArtistSet = new Set(registeredArtist);

  // 次へボタン機能クリックイベント
  function handleNextClick() {
    if (searchedIllustList.length > 0) {
      (searchedHasNext) ? setIndex(index + 1) : setIndex(0);
    } else {
      (hasNext) ? setIndex(index + 1) : setIndex(0);
    }
  }

  // 戻るボタンクリックイベント
  function handlePreviousClick() {
    if (searchedIllustList.length > 0) {
      (index > 0) ? setIndex(index - 1) : setIndex(searchedIllustList.length - 1);
    } else {
      (index > 0) ? setIndex(index - 1) : setIndex(illustrationsList.length - 1);
    }
  }

  // 最初に戻るボタンクリックイベント
  function handleReturnIndexZeroClick() {
    setIndex(0)
  }

  // 詳細ボタンクリックイベント
  function handleMoreClick() {
    setShowMore(!showMore);
  }

  // イメージクリックイベント
  function handleImageClick(illust: any) {
    setModalName(illust.name);
    setModalArtist(illust.artist);
    setModalDescription(illust.description);
    setModalUrl(illust.url);
    setModalAlt(illust.alt);
    setShowModal(!showModal);
  }

  
  return (
    <>
      <h1>ほっこりイラスト</h1>
      
      <h2>アーティスト検索</h2>
      <div>
        <input 
          value={searchText}
          onChange={(event) => setSearchText(event.target.value)}
          placeholder='アーティスト検索'
          />
      </div>
      <h3>検索可能なアーティスト</h3>
      <ul>
        {
          Array.from(regiArtistSet).map((artist) => {
            return <li>{artist}</li>
          })
        }
      </ul>
      { searchedIllustList.length > 0 && <p>{searchedIllust.artist}の検索結果、検索件数{searchedIllustList.length}</p>}
      { searchedIllustList.length < 0 && <p>{searchText}の検索結果がありません</p>}

      <h2>イラストa</h2>
      <button onClick={handleReturnIndexZeroClick}>
        <img 
          src="/reshot-icon-arrow-T5V764PXB9.svg"
          alt="icon-arrow"
          width={16}
          height={16}
          decoding='async'
        />
      </button>
      <button onClick={handlePreviousClick}>
        <img 
          src="/reshot-icon-arrow-left-5VMRGUJX4B.svg"
          alt="icon-arrow-left"
          width={16}
          height={16}
          decoding='async'
        />
      </button>
      <button onClick={handleNextClick}>
        <img 
          src="/reshot-icon-arrow-right-JC8RAFL75Q.svg"
          alt="icon-arrow-right"
          width={16}
          height={16}
          decoding='async'
        />
      </button>
      <button onClick={handleMoreClick}>{showMore ? '非表示' : '表示'} 詳細</button>
      <h3>
        <i>{searchedIllustList.length > 0 ? searchedIllust.name : illustration.name}</i>
        by {searchedIllustList.length > 0 ? searchedIllust.artist : illustration.artist}
        ( {index + 1}
          of {searchedIllustList.length > 0 ? searchedIllustList.length : illustrationsList.length}
        )
      </h3>
      {
        (showMore) 
        ? (searchedIllustList.length > 0) ? <p>{searchedIllust.description}</p> : <p>{illustration.description}</p>
        : <p></p>
      }
      <img
        src={ searchedIllustList.length > 0 ? searchedIllust.url : illustration.url }
        alt={ searchedIllustList.length > 0 ? searchedIllust.alt : illustration.alt }
        height={250}
      />
      <div>
        {
          (searchedIllustList.length > 0) ?
          searchedIllustList.map((illust)=> { 
            
            return <img 
              src={illust.url}
              alt={illust.alt}
              height={100}
              onClick={()=>handleImageClick(illust)}
            />
          })
          : illustrationsList.map((illust)=>{
             return <img
              src={illust.url}
              alt={illust.alt}
              height={100}
              onClick={()=>handleImageClick(illust)}
              />
            })
        }

      </div>

      <Modal 
        showFlag={showModal}
        setShowModal={setShowModal}
        name={ modalName }
        artist={ modalArtist }
        description={ modalDescription }
        url={ modalUrl }
        alt={ modalAlt }
        />
    </>
  )
}
