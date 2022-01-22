import * as React from 'react';
import { useState, useEffect } from 'react';
import '../Css/Map.css';
// import { Link } from "react-router-dom";
import axios from 'axios';
// import { like } from "sequelize/types/lib/operators";
// import UserNavBar from '../Components/UserNavBar';
// import Login from "../Components/Modals/Login";
// import SelectedStore from '../Components/Modals/SelectedStore'
import StoreList from '../Components/Modals/StoreList';
import AddNewStore from '../Components/Modals/AddNewStore';

const { kakao } = window;

const Map = ({ userInfo, isLogin }) => {
  // 입력 칸(검색어를 입력하세요 부분)에 들어가는 문자열 state
  const [InputText, setInputText] = useState('');
  // 장소 입력에 들어가는 입력값
  const [search, setSearch] = useState(' ');
  const [newStoreClick, setNewStoreClick] = useState(false);
  const [clickMaker, setClickMaker] = useState();
  const [currentMaker, setCurrentMaker] = useState(null);
  const [isClick, setIsClick] = useState(false);

  const [mapLatitude, setMapLatitude] = useState(37.57961509140872);
  const [mapLongitude, setMapLongitude] = useState(126.97704325823415);
  const [firstRender, setFirstRender] = useState(true);
  const [positionList, setPositionList] = useState([]);
  const [storeInfo, setStoreInfo] = useState([]);
  const [userUuid, setUserUuid] = useState([]);

  const handleClickStore = () => {
    if (isLogin) {
      setNewStoreClick(!newStoreClick);
    } else {
      alert("로그인이 필요한 서비스입니다!");
    }
  };

  const exitNewStore = () =>{
    setNewStoreClick(false);
  }

  const ClickedMaker = (res) => {
    setClickMaker(res);
  };

  const exitClick = () => {
    setIsClick(false);
  }

  // 입력 시마다 검색 함수에 들어가게 하는 onChange 함수
  const onChange = (e) => {
    setInputText(e.target.value);
    if (InputText.length >= 0) {
      setSearch(InputText); // 이 입력되는 값을 검색함수의 파라미터로 줘야함
    } else {
      setSearch(' ');
      setPlaces([]);
    }
  };

  // 여기에 검색 결과 장소들이 저장됨
  const [Places, setPlaces] = useState([]);
  // 자동완성 리스트에 뜬 장소 이름을 마우스로 클릭하면, 해당 장소 이름으로 search state를 변경
  const handleClickPlaceName = (item) => {
    setMapLatitude(item.y);
    setMapLongitude(item.x);
    setInputText(item.place_name);
    setSearch(item.place_name);
    setPositionList([...positionList, { latitude: item.y, longitude: item.x }]);

    const container = document.getElementById('map');
    const moveLatLon = new kakao.maps.LatLng(item.y, item.x);
    const options = {
      center: moveLatLon,
      level: 3,
    };
    const map = new kakao.maps.Map(container, options);

    map.panTo(moveLatLon); 

    let marker = new kakao.maps.Marker({
      map: map,
      position: new kakao.maps.LatLng(item.y, item.x),
    });
    // 마커 클릭 시, 장소 이름이 인포윈도우로 뜸
    kakao.maps.event.addListener(marker, 'click', function () {
      handleClickStore();
      ClickedMaker(item);
      updateStoreList();
    });

    marker.setMap(map);
  };

  const updateStoreList = async (markerData) => {
    if (markerData !== undefined) {
      await axios({ // 가게 리스트를 요청
        url: `${process.env.REACT_APP_SERVER_URL}/store`,
        method : 'GET',
        params : {
          latitude: markerData.latitude,
          longitude: markerData.longitude,
        }
      })
      .then((res)=>{
        if(res.status === 200){ // 응답을 state에 저장
          const storeList = res.data.data;
          setStoreInfo(storeList);
        }
        else if(res.status === 400){
          alert('위도 또는 경도를 입력하지 않았거나, 잘못 입력되었습니다.');
        }
      })
      .catch((error)=>{
        console.log(error);
      })
    }
  }

  const getUserUuid = async () => {
    const accessToken = userInfo.accessToken.data.accessToken;
    await axios({ // 가게 리스트를 요청
      url: `${process.env.REACT_APP_SERVER_URL}/user`,
      method : 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      withCredentials: true
    })
    .then((res)=>{
      if(res.status === 200){ // 응답을 state에 저장
        const { user_uuid } = res.data.data;

        setUserUuid(user_uuid);
      }
    })
    .catch((error)=>{
      console.log(error);
    })
  }

  useEffect(async () => {
    if (userInfo !== undefined && userInfo !== null) {
      getUserUuid();
    }

    const container = document.getElementById('map');
    const options = {
      center: new kakao.maps.LatLng(mapLatitude, mapLongitude),
      level: 3,
    };
    const map = new kakao.maps.Map(container, options);
    // 장소 검색 객체
    const ps = new kakao.maps.services.Places();
    // search 검색어로 장소 검색을 함
    ps.keywordSearch(search, placesSearchCB);
    // 장소 검색 시, 호출되는 콜백함수
    function placesSearchCB(data, status, pagination) {
      if (status === kakao.maps.services.Status.OK) {
        // 배열 내 요소 중복으로 삽입되는 것을 방지하는 filter
        const filtered = [];
        // 최종적으로 리스트에 담겨질 배열
        const placeList = [];
        for (let i = 0; i < data.length; i++) {
          if (
            data[i].category_group_name === '음식점' ||
            data[i].category_group_name === '카페' ||
            data[i].category_group_name !== ''
          ) {
            // 반복 중, filtered 내의 객체의 해당 id값이 있는지 확인
            if (!filtered.includes(data[i].id)) {
              // 만약 중복되지 않았다면, id 값을 filter에 삽입
              filtered.push(data[i].id);
              // 최종적으로 리스트에 담겨질 배열에 해당 객체를 삽입
              placeList.push(data[i]);
            }
          }
        }
        // 최종 리스트에 있는 요소들을 검색 결과 출력용 State(Places)에 담아줌
        setPlaces(placeList);

        // 검색 결과를 Places(State)에 담아줌

        //Places 는 배열(배열 안에 장소 정보가 객체로 저장)
        //이 배열 내 객체들의 place_name과 address_name을 map해야함(자동완성)
      }
    }
    
    if (firstRender) {
      await axios({
        // 핀조회 axios 요청
        url: `${process.env.REACT_APP_SERVER_URL}/map/pin`,
        method: 'GET',
        params: {
          latitude: mapLatitude,
          longitude: mapLongitude,
          like: false,
        },
        withCredentials: true,
      })
        .then((res) => {
          if (res.status === 200) {
            // 요청을 잘 받으면 화면상에 중심 좌표 값으로 지도를 나타낸다. 또한
  
            const positions = res.data.data;
  
            for (let i = 0; i < positions.length; i++) {
              const markerPosition = new kakao.maps.LatLng(
                positions[i].latitude,
                positions[i].longitude
              );
              const marker = new kakao.maps.Marker({
                position: markerPosition, // 마커를 표시할 위치
              });
  
              marker.setMap(map);
  
              kakao.maps.event.addListener(marker, 'click', function () {
                // 마커 이벤트
                // 핀 정보 저장
                setCurrentMaker(res.data.data[i]);
                // 가게 리스트 모달창
                setIsClick(true);
                // setIsAuth(token)
                updateStoreList(res.data.data[i]);
              });
            }

            setPositionList(positions);
            setFirstRender(false);
          } else if (res.status === 400) {
            alert('파라미터가 누락 되었거나 잘못 되었습니다.');
          } else if (res.status === 401) {
            alert('액세스 토큰이 만료 되었습니다.');
          } else if (res.status === 401) {
            alert('액세스 토큰이 잘못되었습니다.');
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      for (let i = 0; i < positionList.length; i++) {
        const markerPosition = new kakao.maps.LatLng(
          positionList[i].latitude,
          positionList[i].longitude
        );
        const marker = new kakao.maps.Marker({
          position: markerPosition, // 마커를 표시할 위치
        });

        marker.setMap(map);

        kakao.maps.event.addListener(marker, 'click', function () {
          setStoreInfo([]);
          // 마커 이벤트
          // 핀 정보 저장
          setCurrentMaker(positionList[i]);
          // 가게 리스트 모달창
          setIsClick(true);
          // setIsAuth(token)
          updateStoreList(positionList[i]);
        });
      }
    }
  }, [search]);

  return (
    <div className="with-map-siderbar">
      <div className="inputform">
        <form>
          <input
            placeholder="검색어를 입력하세요"
            onChange={onChange}
            value={InputText}
          />
          <button type="submit">찾기</button>
          <ul className="search-autocomplete-box">
            {Places.map((item) => (
              <li key={item.id} onClick={() => {handleClickPlaceName(item);}}>
                {item.place_name}
              </li>
            ))}
          </ul>
        </form>
      </div>
      {isClick ? (
        <StoreList userUuid={userUuid} currentMaker={currentMaker} userInfo={userInfo} storeInfo={storeInfo} isLogin={isLogin} clickMaker={clickMaker} newStoreClick={newStoreClick} handleClickStore={handleClickStore} exitClick={exitClick} exitNewStore={exitNewStore} updateStoreList={updateStoreList}/>
      ) : ''}
    <div id="map"></div>
    </div>
  );
};

export default Map;
