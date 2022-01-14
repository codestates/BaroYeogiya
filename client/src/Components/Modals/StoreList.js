import axios from 'axios';
import * as React from 'react';
// import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

import '../../Css/NavBar.css'
import '../../Css/StoreList.css'

// 마커 클릭 후 siderBar에 나타나는 가게 리스트
const StoreList = ({ currentMaker }) => { //map에서 props 넘겨줌
  const [storeList, setStoreList] = useState()
  console.log('가게이름?', storeList)

  useEffect(() => {
    console.log('위도?', currentMaker.latitude)
    console.log('경도?', currentMaker.longitude)
    axios({ // 가게 리스트를 요청
      url: `${process.env.REACT_APP_SERVER_URL}/store`,
      method : 'GET',
      params : {
        latitude: currentMaker.latitude,
        longitude: currentMaker.longitude,
        // offset : 0,
        // limit : 10
      }
    })
    .then((res)=>{
      console.log('가게?',res)
      if(res.status === 200){ // 응답을 state에 저장
        const storeNames = res.data.data
        
        for(let i = 0; i < storeNames.length; i++){
          const storeName = storeNames[i].address
          console.log('storeName', storeName)
          setStoreList(storeName)
        }
        
      }
      else if(res.status === 400){
        alert('위도 또는 경도를 입력하지 않았거나, 잘못 입력되었습니다.')
      }
    })
    .catch((error)=>{
      console.log(error)
    })
  }, []);

  return (
    <div id="map-store-list-box">
      <div id="map-store-list">
        <div id="map-siderbar">
          {/* <Link to="/"> */}
          <button className="bt">로고</button>
          {/* css 수정 해야됨, Link 왜 안되는거지? */}
          {/* </Link> */}
        </div>
        <div id="pin-store">
          <button className="bt">
            {storeList}
            {/* 저장한 state 값을 입력 */}
          </button>
          <button>매장 찜하기</button>
        </div>
      </div>
    </div>
  )
};

export default StoreList;