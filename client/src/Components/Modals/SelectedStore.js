import * as React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import '../../Css/SelectedStore.css'
import Reviews from './Reviews';

function SelectedStore({ storeId, userInfo }) { // storeList에서 넘어옴

  const [ storeReviews, setStoreReview ] = useState([]); //가게에 대한 데이터가 들어옴
  const [ reviewTxt, setReviewTxt ] = useState(''); // 리뷰 작성으로 얻은 문자열 들어옴
  
  const token = userInfo.accessToken.data.accessToken; // props로 받은 토큰

  const handleReviewTxt = (e) => { // 새롭게 저장할 리뷰
    setReviewTxt(e.target.value);
  };

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
        console.log('store 리뷰', reviewlist)
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


  const onClickReview = async () => { // 리뷰 작성 후 버튼 클릭을 했을 시 작동되는 함수(리뷰 등록)
    if (reviewTxt.length > 12){
      alert('리뷰 작성은 11자 이하로 해주세요')
    }
    await axios({
      url: `${process.env.REACT_APP_SERVER_URL}/review`,
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`
      },
      data: {
        store_uuid: storeId,
        content: reviewTxt
      },
      withCredentials: true
    })
      .then((res) => {
        if (res.status === 200) {
          const newReview = res.data.data
          setStoreReview(current => [...current, newReview])
        }
        else if(res.status === 400){
          alert('파라미터가 누락되었거나 잘못되었습니다.')
        }
        else if (res.status === 400) {
          alert('존재하지 않는 매장입니다.')
        }
        else if (res.status === 401) {
          alert('액세스 토큰이 만료 되었습니다.')
        }
        else if (res.status === 401) {
          alert('액세스 토큰이 잘못되었습니다.')
        }
      })
    }
  
  const handleMyPick = async () => { // 마이페이지 찜 목록으로 정보를 전달(찜하기)
    await axios({
      url: `${process.env.REACT_APP_SERVER_URL}/store/${storeId}`,
      method: 'POST',
      path: {
        store_uuid: storeId
      },
      headers: {
        Authorization: `Bearer ${token}`
      },
      withCredentials: true
    })
      .then((res) => {
        if (res.status === 201) {
          alert('찜에 성공했습니다.');
        }
        else if (res.status === 400) {
          alert('이미 찜한 매장입니다.');
        }
        else if (res.status === 400) {
          alert('존재하지 않는 매장입니다.');
        }
        else if (res.status === 401) {
          alert('액세스 토큰이 만료되었습니다.');
        }
        else if (res.status === 401) {
          alert('액세스 토큰이 잘못되었습니다.');
        }
      })
      .catch((error) => {
        console.log(error)
      })
  };

  return(
    <div id='entire-box'>
      <div id='review-entire-box'>
        <header>
          <div id='store-name'>대나무</div>
        </header>
        <img id='store-img'></img>
        <div id='reviews-scroll-box'>
          {storeReviews.map((marker, idx) => <Reviews key={idx} marker={marker} userInfo={userInfo} />) }
        </div>
        <input id='review-write' onChange={handleReviewTxt} ></input>
        <button id='register-review' onClick={onClickReview} > 리뷰추가 </button>
        <button id='register-my-pick' onClick={handleMyPick} >찜 하기</button>
      </div>
    </div>
  )
}

export default SelectedStore;