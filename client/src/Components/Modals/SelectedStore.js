import * as React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import '../../Css/SelectedStore.css'
import Reviews from './Reviews';

function SelectedStore({ userUuid, selectStore, userInfo, isLogin, handleStoreClick }) { // storeList에서 넘어옴

  const [ storeReviews, setStoreReview ] = useState([]); //가게에 대한 데이터가 들어옴
  const [ reviewTxt, setReviewTxt ] = useState(''); // 리뷰 작성으로 얻은 문자열 들어옴
  const [ page, setPage ] = useState(1);

  const storeId = selectStore.store_uuid;

  const handleReviewTxt = (e) => { // 새롭게 저장할 리뷰
    setReviewTxt(e.target.value);
  };

  const searchReview = async (offset = 0) => {
    await axios({
      url: `${process.env.REACT_APP_SERVER_URL}/review`,
      method : 'GET',
      params : {
        store_uuid: storeId,
        offset
      }
    })
    .then((res) => {
      if(res.status === 200){
        const reviewlist = res.data.data;
        setStoreReview(reviewlist);
      }
      else if(res.status === 400){
        alert('파라미터가 누락되었거나 잘못되었습니다.')
      }
    })
    .catch((err) => {
      console.log(err);
    });
  }

  // 페이징
  const pagingReview = async (setNum = 0) => {
    let pageNum = page;
    if (setNum < 0 && pageNum > 1) {
      pageNum--;
    } else if (setNum > 0) {
      pageNum++;
    }
    await setPage(pageNum);
    searchReview(pageNum - 1);
  }

  useEffect(() => {
    searchReview();
  },[storeId])

  const onClickReview = async () => { // 리뷰 작성 후 버튼 클릭을 했을 시 작동되는 함수(리뷰 등록)
    if (window.confirm('등록하시겠습니까?')) {
      const token = userInfo.accessToken.data.accessToken;
      if (reviewTxt.length > 20){
        alert('20글자 이하의 글만 작성할 수 있습니다.')
      } else {
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
          if (res.status === 201) {
            alert('리뷰가 추가 되었습니다.')
            setPage(1);
            searchReview();
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
    }
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
        else if (res.status === 200) {
          alert('이미 찜한 매장입니다.');
        }
        else {
          alert('찜에 실패했습니다.');
        }
      })
      .catch((error) => {
        console.log(error)
      })
  };

  return(
    <div id='entire-box'>
      <div id='review-entire-box'>
        <p id='store-name'>{selectStore.address}</p>
        <img src="Images/exit2.svg" onClick={() => handleStoreClick()}/>
        {isLogin?
          <button id='register-my-pick' onClick={handleMyPick} >찜하기</button>
          : ''
        }
        <ul id='reviews-scroll-box'>
          {storeReviews.map((review) => <Reviews userUuid={userUuid} review={review} userInfo={userInfo} searchReview={searchReview} />) }
        </ul>
        <div className="cart-list-page">
          <p onClick={() => {pagingReview(-1);}}>이전페이지</p>
          <p>{page}</p>
          <p onClick={() => {pagingReview(1);}}>다음페이지</p>
        </div>
        <div id='review-write'>
          <input onChange={handleReviewTxt} maxLength="20"></input>
          <button id='register-review' onClick={isLogin? onClickReview : () => {alert('로그인이 필요합니다.')}}>리뷰 등록</button>
        </div>
      </div>
    </div>
  )
}

export default SelectedStore;