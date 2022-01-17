import * as React from 'react';
import { useState, useEffect } from "react";
import '../Css/Map.css'
// import { Link } from "react-router-dom";
import axios from "axios";
// import { like } from "sequelize/types/lib/operators";
// import UserNavBar from '../Components/UserNavBar';
// import Login from "../Components/Modals/Login";
// import SelectedStore from '../Components/Modals/SelectedStore'
import StoreListSiderBar from "../Components/Modals/StoreListSiderBar";
import StoreList from '../Components/Modals/StoreList';
import GuestStoreList from '../Components/Modals/GuestStoreList'

const { kakao } = window;

const Map = ({ isLogin }) => {
console.log(33333)
  const [currentMaker, setCurrentMaker] = useState(null)
  // const [like, setLike] = useState(true)
  const [isClick, setIsClick] = useState(false)



  // const [ isAuth, setIsAuth ] = useState(null)



  // const [mapLatitude, setMapLatitude] = useState()
  // const [mapLongitude, setMapLongitude] = useState()

  useEffect(async () => {
    // app.js에서 props로 내려준 값이다.
    // const token = userInfo.accessToken.data.accessToken;

    const container = document.getElementById('map');
    const options = {
      center: new kakao.maps.LatLng(37.57961509140872, 126.97704325823415),
      level: 3
    };
    const map = new kakao.maps.Map(container, options);

    // 내 위치 조회 api는 위도,경도 값은 0이 들어온다. test 아이디는 위도, 경도 값이 있지만 해당 값을 pin api에서 이용하면 파라미터를 에러코드 400 뜸
    // axios({
    //   url: `${process.env.REACT_APP_SERVER_URL}/map`,
    //   method : 'GET',
    //   headers : {
    //     Authorization : `Bearer ${token}`
    //   }
    // })
    // .then((res) => {
    //   console.log('내 위차?', res)
    //   const myLatitude = res.data.data.latitude
    //   const myLongitude = res.data.data.longitude
    //   if(res.status === 200){
    //     setMapLatitude(myLatitude)
    //     setMapLongitude(myLongitude)
    //   }
    //   else if(res.status === 401){
    //     alert('액세스 토큰이 만료되었습니다.')
    //   }
    //   else if (res.status === 401) {
    //     alert('액세스 토큰이 잘못 되었습니다.')
    //   }
    // })
    // .catch((error)=>{
    //   console.log(error)
    // })


    // like가 true일땐 핀조회 데이터가 빈배열이다. 위치도 false일때와 똑같은데 왜지?
    await axios({ // 핀조회 axios 요청
      url: `${process.env.REACT_APP_SERVER_URL}/map/pin`,
      method: 'GET',
      params: {
        latitude: 37.57961509140872,
        longitude: 126.97704325823415,
        like: false
      },
      withCredentials: true
    })
      .then((res) => {
        if (res.status === 200) { // 요청을 잘 받으면 화면상에 중심 좌표 값으로 지도를 나타낸다. 또한

          const positions = res.data.data

          for (let i = 0; i < positions.length; i++) {
            const markerPosition = new kakao.maps.LatLng(positions[i].latitude, positions[i].longitude);
            const marker = new kakao.maps.Marker({
              position: markerPosition, // 마커를 표시할 위치
            });

            marker.setMap(map)

            kakao.maps.event.addListener(marker, 'click', function () {// 마커 이벤트
              // 핀 정보 저장
              setCurrentMaker(res.data.data[i]);
              // 가게 리스트 모달창
              setIsClick(true);
              // setIsAuth(token)
            });

          }
        }
        else if (res.status === 400) {
          alert('파라미터가 누락 되었거나 잘못 되었습니다.')
        }
        else if (res.status === 401) {
          alert('액세스 토큰이 만료 되었습니다.')
        }
        else if (res.status === 401) {
          alert('액세스 토큰이 잘못되었습니다.')
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }, []);


  return (
    <>
      <div className="with-map-siderbar">
        {isClick ? <GuestStoreList currentMaker={currentMaker} isLogin={isLogin} /> : <StoreListSiderBar />}
        <div id="map"></div>
      </div>
    </>
  )
}

export default Map;