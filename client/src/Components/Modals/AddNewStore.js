import '../../Css/Map.css'
import * as React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';

function AddNewStore({ clickMaker, currentMaker, userInfo, handleClickStore, updateStoreList }) {

  const [storeName, setStoreName] = useState('')

  const hanldeStoreName = (e) => {
    setStoreName(e.target.value)
  }

  const onClickNewStore = () => {
    if (storeName === '') {
      alert('매장 이름을 입력해주세요.');
    } else {
      const token = userInfo.accessToken.data.accessToken;
      let latitude;
      let longitude;

      if (clickMaker === undefined) {
        latitude = currentMaker.latitude;
        longitude = currentMaker.longitude;
      } else {
        latitude = clickMaker.y;
        longitude = clickMaker.x;
      }
      axios({
        url : `${process.env.REACT_APP_SERVER_URL}/store`,
        method : 'POST',
        data : {
          address : storeName,
          latitude,
          longitude
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      })
      .then((res)=>{
        if(res.status === 201){
          alert('매장 등록이 완료되었습니다.');
          handleClickStore();
          updateStoreList({ latitude, longitude });
        }
        else if(res.status === 400){
          alert('등록 정보가 누락 되었습니다.')
        }
        else if(res.status === 401 ){
          alert('액세스 토큰이 만료되었습니다.')
        }
      })
    }
  }

  return(
    <div className='new-store-container'>
      <p>매장 등록</p>
      <img src="Images/exit2.svg" onClick={() => handleClickStore()}/>
      <div className='store-name-box'>
        <p className='new-store-name'>매장 이름</p>
        <input className='store-name-input' type='text' onChange={hanldeStoreName} ></input>
      </div>
      <button onClick={() => {onClickNewStore()}} >등록</button>
    </div>
    )
}

export default AddNewStore;