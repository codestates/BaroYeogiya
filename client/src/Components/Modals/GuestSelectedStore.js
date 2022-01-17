import * as React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import '../../Css/SelectedStore.css'
import GuestReviews from './GuestReviews';

function SelectedStore({ storeId }) { // storeList에서 넘어옴

  const [ storeReviews, setStoreReview ] = useState([]); //가게에 대한 데이터가 들어옴

  useEffect( async ()=>{ // 리뷰 조회
    await axios({
      url: `${process.env.REACT_APP_SERVER_URL}/review`,
      method : 'GET',
      params : {
        store_uuid : storeId,
      }
    })
    .then((res)=>{
      if(res.status === 200){
        const reviewlist = res.data.data
        for(let i = 0; i < reviewlist.length; i++){
          const reviewContent = reviewlist[i]
          setStoreReview(current => [...current, reviewContent])
        }
      }
      else if(res.status === 400){
        alert('파라미터가 누락되었거나 잘못되었습니다.')
      }
    })
    .catch((error)=>{
      console.log(error)
    })
  },[])

  
  const handleMyPick = () => { // 리뷰 작성 후 버튼 클릭을 했을 시 작동되는 함수(리뷰 등록)
    alert('로그인을 해주세요')
  }

  return(
    <div id='entire-box'>
      <div id='review-entire-box'>
        <header>
          <div id='store-name'>대나무</div>
        </header>
        <img id='store-img'></img>
        <div id='reviews-scroll-box'>
          {storeReviews.map((marker, idx) => <GuestReviews key={idx} marker={marker} />) }
        </div>
        <button id='register-my-pick' onClick={ handleMyPick } >찜 하기</button>
      </div>
    </div>
  )
}

export default SelectedStore;