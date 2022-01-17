import * as React from 'react';
import '../../Css/Reviews.css'

function Reviews({ marker }) {
  return(
    <>
    <div id='review-box'>
      <div id='review-txt'>
      리뷰 : {marker.content}
      </div>
    </div>
    </>
  )
}

export default Reviews;