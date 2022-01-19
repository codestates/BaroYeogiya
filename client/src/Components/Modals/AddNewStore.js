import '../../Css/Map.css'
import * as React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';

function AddNewStore({ clickMaker, userInfo, handleClickStore }) {

  const token = userInfo.accessToken.data.accessToken;

  const [storeName, setStoreName] = useState('')

  const hanldeStoreName = (e) => {
    setStoreName(e.target.value)
  }

  const onClickNewStore = () => {
    axios({
      url : `${process.env.REACT_APP_SERVER_URL}/store`,
      method : 'POST',
      data : {
        address : storeName,
        latitude : clickMaker.y,
        longitude : clickMaker.x
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    })
    .then((res)=>{
      console.log(res)
      if(res.status === 201){
        alert('매장 등록이 완료되었습니다.');
        handleClickStore();
      }
      else if(res.status === 400){
        alert('등록 정보가 누락 되었습니다.')
      }
      else if(res.status === 401 ){
        alert('액세스 토큰이 만료되었습니다.')
      }
    })
  }

  return(
    <div className='new-store-container'>
      <div className='new-store-box'>
        <p onClick={() => handleClickStore()} >x</p>
        <div className='img-box'>
          <p className='new-store-txt'>이미지</p>
          <img className='new-store-img'></img>
        </div>
        <div className='store-name-box'>
          <p className='new-store-name'>가게 이름</p>
          <input className='store-name-input' type='text' onChange={hanldeStoreName} ></input>
        </div>
        <button onClick={onClickNewStore} >등록</button>
      </div>
    </div>
  )
}

export default AddNewStore;