import axios from 'axios';
import * as React from 'react';
import { useEffect, useState } from 'react';
import SelectedStore from './SelectedStore';
import AddNewStore from './AddNewStore';

import '../../Css/NavBar.css'
import '../../Css/StoreList.css'

// 마커 클릭 후 siderBar에 나타나는 가게 리스트
const StoreList = ({ userUuid, currentMaker, userInfo, storeInfo, isLogin, clickMaker, newStoreClick, handleClickStore, exitClick, exitNewStore, updateStoreList }) => { //map에서 props 넘겨줌
  const [storeClick, setStoreClick] = useState(false)
  const [selectStore, setSelectStore] = useState({});

  const showReview = (storeData) => {
    setStoreClick(true); //리뷰 리스트 보여주는 함수
    setSelectStore(storeData);
  };

  const handleStoreClick = () => {
    setStoreClick(false);
  }

  return (
    <>
      {storeClick ? <SelectedStore userUuid={userUuid} selectStore={selectStore} userInfo={userInfo} isLogin={isLogin} handleStoreClick={handleStoreClick} /> : null }
      {newStoreClick ? <AddNewStore clickMaker={clickMaker} currentMaker={currentMaker} userInfo={userInfo} handleClickStore={handleClickStore} updateStoreList={updateStoreList} /> : null}
      <div id='map-store-list-box'>
        <div id='map-store-list'>
          <div id='pin-store'>
            <p>매장 리스트</p>
            <img className="exit" src="Images/exit2.svg" onClick={exitClick}/>
            <ul>
              {storeInfo.length === 0 ? <li className="default">등록된 매장이 없어요..</li> :
                  storeInfo.map((res)=>
                  <li onClick={() => {
                    showReview(res); 
                    exitNewStore();
                  }}>
                    {res.address}
                  </li>
                )
              }
            </ul>
            <button onClick={() => {
              setStoreClick(false);
              handleClickStore();
            }}>찾는 매장이 없으신가요?</button>
          </div>
        </div>
      </div>
    </>
  )
};

export default StoreList;