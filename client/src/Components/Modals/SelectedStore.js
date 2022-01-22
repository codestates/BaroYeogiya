import * as React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import '../../Css/SelectedStore.css'
import Reviews from './Reviews';

function SelectedStore({ storeId, userInfo, isLogin }) { // storeList에서 넘어옴

  const [ storeReviews, setStoreReview ] = useState([]); //가게에 대한 데이터가 들어옴
  const [ reviewTxt, setReviewTxt ] = useState(''); // 리뷰 작성으로 얻은 문자열 들어옴

  const handleReviewTxt = (e) => { // 새롭게 저장할 리뷰
    setReviewTxt(e.target.value);
  };

  const handlePick = () => { // 게스트가 리뷰 작성 후 버튼 클릭을 했을 시 작동되는 함수
    alert('로그인을 해주세요')
  }

  useEffect( async ()=>{ // 리뷰 조회
    await axios({
      url: `${process.env.REACT_APP_SERVER_URL}/review`,
      method : 'GET',
      params : {
        store_uuid: storeId,
      }
    })
    .then((res)=>{
      if(res.status === 200){
        const reviewlist = res.data.data
        const currentReview = [];
        
        for(let i = 0; i < reviewlist.length; i++){
          const reviewContent = reviewlist[i]
          currentReview.push(reviewContent)

        }
        setStoreReview(currentReview)
      }
      else if(res.status === 400){
        alert('파라미터가 누락되었거나 잘못되었습니다.')
      }
    })
    .catch((error)=>{
      console.log(error)
    })
  },[storeReviews])

  
  const onClickReview = async () => { // 리뷰 작성 후 버튼 클릭을 했을 시 작동되는 함수(리뷰 등록)
    const token = userInfo.accessToken.data.accessToken;
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
          alert('리뷰가 추가 되었습니다.')
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
      .catch((err)=>{
        console.log(err)
      })
    }
  
  
  const handleMyPick = async () => { // 마이페이지 찜 목록으로 정보를 전달(찜하기)
    const token = userInfo.accessToken.data.accessToken;
    await axios({
      url: `${process.env.REACT_APP_SERVER_URL}/store/${storeId}`,
      method: 'POST',
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
        <div id='reviews-scroll-box'>
          { storeReviews.map((marker, idx) => <Reviews key={idx} marker={marker} userInfo={userInfo} isLogin={isLogin} />) }
        </div>
          <input id='review-write' onChange={handleReviewTxt} ></input>
          {isLogin?
            <button id='register-review' onClick={onClickReview} > 리뷰추가 </button>
            : <button id='register-my-pick' onClick={handlePick} > 리뷰추가 </button>
          }
          {isLogin?
            <button id='register-my-pick' onClick={handleMyPick} >찜 하기</button>
            : <button id='register-my-pick' onClick={handlePick} >찜 하기</button>
          }
      </div>
    </div>
  )
}

export default SelectedStore;