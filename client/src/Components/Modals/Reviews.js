import axios from 'axios';
import * as React from 'react';
import '../../Css/Reviews.css'

function Reviews({ marker, userInfo }) {
  
  const token = userInfo.accessToken.data.accessToken;
  const reviewId = marker.review_uuid

  const handleDeleteReview = async () => { // 리뷰 삭제
    await axios({
      url: `${process.env.REACT_APP_SERVER_URL}/review/${reviewId}`,
      method : 'delete',
      path : {
        review_uuid : reviewId
      },
      headers: {
        Authorization: `Bearer ${token}`
      },
      withCredentials: true
    })
    .then((res)=>{
      console.log('머임?', res)
      if(res.status === 200){
        alert('삭제에 성공했습니다.')
        // 새로고침 기능이 되게 하는 기능을 넣어야 하나???
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
    <>
    <div id='review-box'>
      <div id='review-txt'>
      리뷰 : {marker.content}
      </div>
      <div id='delete-review' onClick={() => handleDeleteReview()} >X</div>
    </div>
    </>
  )
}

export default Reviews;