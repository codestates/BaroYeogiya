import axios from 'axios';
import * as React from 'react';
import '../../Css/Reviews.css'

function Reviews({ userUuid, review, userInfo, searchReview }) {
  
  const reviewId = review.review_uuid

  const handleDeleteReview = async () => { // 리뷰 삭제
    const token = userInfo.accessToken.data.accessToken;
    await axios({
      url: `${process.env.REACT_APP_SERVER_URL}/review/${reviewId}`,
      method : 'delete',
      headers: {
        Authorization: `Bearer ${token}`
      },
      withCredentials: true
    })
    .then((res)=>{
      if(res.status === 200){
        alert('삭제에 성공했습니다.');
        searchReview();
      }
      else if(res.status === 400){
        alert('존재하지 않는 리뷰입니다.')
      }
      else if (res.status === 401) {
        alert('액세스 토큰이 만료 되었습니다.')
      }
      else if (res.status === 401) {
        alert('액세스 토큰이 잘못되었습니다.')
      }
      else if (res.status === 401) {
        alert('삭제에 대한 권한이 없습니다.')
      }
    })
    .catch((error)=>{
      console.log(error)
    })
  }

  return(
    <li>
      {review.content}
      {review.user_uuid === userUuid ? 
        <button onClick={handleDeleteReview}>리뷰 삭제</button>
        : ''}
    </li>
  )
}

export default Reviews;