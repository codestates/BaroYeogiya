import axios from 'axios';
import * as React from 'react';
import { useEffect, useState } from 'react';
import SelectedStore from './SelectedStore';
import AddNewStore from './AddNewStore';

import '../../Css/NavBar.css'
import '../../Css/StoreList.css'

// 마커 클릭 후 siderBar에 나타나는 가게 리스트
const StoreList = ({ currentMaker, userInfo, isLogin, newStoreClick, handleClickStore }) => { //map에서 props 넘겨줌

  const [storeClick, setStoreClick] = useState(false)
  const [storeId, setStoreId] = useState(null)
  const [storeInfo, setStoreInfo] = useState([])
  

  const showReview = () => {
    setStoreClick(true); //리뷰 리스트 보여주는 함수
  };

  useEffect( async () => {
    await axios({ // 가게 리스트를 요청
      url: `${process.env.REACT_APP_SERVER_URL}/store`,
      method : 'GET',
      params : {
        latitude: currentMaker.latitude,
        longitude: currentMaker.longitude,
      }
    })
    .then((res)=>{
      if(res.status === 200){ // 응답을 state에 저장
        const storeNames = res.data.data
        console.log('이름?', storeNames)
        for(let i = 0; i < storeNames.length; i++){
          const storeUuid = storeNames[i].store_uuid // 가게 id , data 구조분해 할당으로 바꾸는거 생각 해 보기
          const storeInfoList = storeNames[i]
          setStoreId(storeUuid);
          setStoreInfo(current => [...current, storeInfoList])
        }
        
      }
      else if(res.status === 400){
        alert('위도 또는 경도를 입력하지 않았거나, 잘못 입력되었습니다.');
      }
    })
    .catch((error)=>{
      console.log(error);
    })
  }, []);


  return (
    <>
      {storeClick ? <SelectedStore storeInfo={storeInfo} userInfo={userInfo} storeId={storeId} isLogin={isLogin} /> : null }
      {newStoreClick ? <AddNewStore currentMaker={currentMaker} userInfo={userInfo} /> : null}
      <div id='map-store-list-box'>
        <div id='map-store-list'>
          <div id='map-siderbar'>
            <button className='bt'>로고</button>
          </div>
          <div id='pin-store'>
            {storeInfo.map((res)=>
              <button className='bt' onClick={() => { showReview(); } }>
                {res.address}
              </button>
            )}
            {isLogin ?
              <button className='bt' onClick={handleClickStore} >매장 등록</button> : null
            }
          </div>
        </div>
      </div>
    </>
  )
};

export default StoreList;