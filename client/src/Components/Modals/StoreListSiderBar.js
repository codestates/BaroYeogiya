import * as React from 'react';
// import { Link } from 'react-router-dom';
import '../../Css/NavBar.css'
import '../../Css/StoreList.css'
// import { useNavigate } from 'react-router-dom';

// 마커를 클릭 하기전 siderBar
const StoreListSiderBar = () => {
  // const navigate = useNavigate();
  return (
    <div id="map-store-list-box">
      <div id="map-store-list">
        <div id="map-siderbar">
          <button className='bt'>로고</button>
        </div>
        <div id="pin-store">
          <p id="map-siderbar-text">지도의 핀을 클릭해보세요 !</p>
        </div>
      </div>
    </div>
  )
};

export default StoreListSiderBar;