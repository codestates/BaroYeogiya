import * as React from 'react';
import { useState, useEffect } from 'react';
import '../Css/Map.css';
// import { Link } from "react-router-dom";
import axios from 'axios';
// import { like } from "sequelize/types/lib/operators";
// import UserNavBar from '../Components/UserNavBar';
// import Login from "../Components/Modals/Login";
// import SelectedStore from '../Components/Modals/SelectedStore'
import StoreListSiderBar from '../Components/Modals/StoreListSiderBar';
import StoreList from '../Components/Modals/StoreList';
import AddNewStore from '../Components/Modals/AddNewStore';

const { kakao } = window;

const Map = ({ userInfo }) => {
  // 입력 칸(검색어를 입력하세요 부분)에 들어가는 문자열 state
  const [InputText, setInputText] = useState('');
  // 장소 입력에 들어가는 입력값
  const [search, setSearch] = useState('');
  const [newStoreClick, setNewStoreClick] = useState(false);
  const [clickMaker, setClickMaker] = useState();

  const handleClickStore = () => {
    setNewStoreClick(!newStoreClick);
  };

  const ClickedMaker = (res) => {
    setClickMaker(res);
  };

  // 입력 시마다 검색 함수에 들어가게 하는 onChange 함수
  const onChange = (e) => {
    setInputText(e.target.value);
    if (e.target.value.length >= 2) {
      setSearch(e.target.value); // 이 입력되는 값을 검색함수의 파라미터로 줘야함
    } else {
      setSearch('');
      setPlaces([]);
    }
  };
  // 여기에 검색 결과 장소들이 저장됨
  const [Places, setPlaces] = useState([]);
  // 자동완성 리스트에 뜬 장소 이름을 마우스로 클릭하면, 해당 장소 이름으로 search state를 변경
  const handleClickPlaceName = (item) => {
    console.log(item.target.innerHTML);
    setSearch(item.target.innerHTML);
    setInputText(item.target.innerHTML);
  };

  const [currentMaker, setCurrentMaker] = useState(null);
  // const [like, setLike] = useState(true)
  const [isClick, setIsClick] = useState(false);

  // const [ isAuth, setIsAuth ] = useState(null)

  // const [mapLatitude, setMapLatitude] = useState()
  // const [mapLongitude, setMapLongitude] = useState()

  useEffect(async () => {
    // 마커를 클릭했을 때 장소 이름이 인포윈도우로 뜨는 창
    var infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });
    var markers = [];

    // app.js에서 props로 내려준 값이다.
    const token = userInfo.accessToken.data.accessToken;

    const container = document.getElementById('map');
    const options = {
      center: new kakao.maps.LatLng(37.57961509140872, 126.97704325823415),
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
        let bounds = new kakao.maps.LatLngBounds();

        for (let i = 0; i < data.length; i++) {
          displayMarker(data[i]);
          bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
        }

        map.setBounds(bounds);

        // 검색 결과를 Places(State)에 담아줌
        setPlaces(data);

        console.log(Places); //Places 는 배열(배열 안에 장소 정보가 객체로 저장)
        //이 배열 내 객체들의 place_name과 address_name을 map해야함(자동완성)
      }
    }
    function displayMarker(place) {
      let marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(place.y, place.x),
      });
      // 마커 클릭 시, 장소 이름이 인포윈도우로 뜸
      kakao.maps.event.addListener(marker, 'click', function () {
        infowindow.setContent(
          '<div style="padding:5px;font-size:12px;">' +
            place.place_name +
            '</div>'
        );
        infowindow.open(map, marker);
        handleClickStore();
        ClickedMaker(place)
      });
    }

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
    await axios({
      // 핀조회 axios 요청
      url: `${process.env.REACT_APP_SERVER_URL}/map/pin`,
      method: 'GET',
      params: {
        latitude: 37.57961509140872,
        longitude: 126.97704325823415,
        like: true,
      },
      headers: {
        Authorization: `Bearer ${token}`,
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
            });
          }
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
  }, [search]);

  return (
    <>
      {newStoreClick ? (<AddNewStore clickMaker={clickMaker} userInfo={userInfo} handleClickStore={handleClickStore} />) : null}
      <div className="inputform">
        <form>
          <input
            placeholder="검색어를 입력하세요"
            onChange={onChange}
            value={InputText}
          />
          <button type="submit">검색 로고(돋보기)</button>
          <div className="search-autocomplete-box">
            {Places.map((item) => (
              <ul onClick={handleClickPlaceName}>{item.place_name}</ul>
            ))}
          </div>
        </form>
      </div>
      <div className="with-map-siderbar">
        {isClick ? (
          <StoreList currentMaker={currentMaker} userInfo={userInfo} />
        ) : (
          <StoreListSiderBar />
        )}
        <div id="map"></div>
      </div>
    </>
  );
};

export default Map;
