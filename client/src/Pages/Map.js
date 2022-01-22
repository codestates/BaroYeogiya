import * as React from 'react';
import { useState, useEffect } from 'react';
import '../Css/Map.css';
import axios from 'axios';
import StoreListSiderBar from '../Components/Modals/StoreListSiderBar';
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

  const handleClickStore = () => {
    setNewStoreClick(!newStoreClick);
  };

  const ClickedMaker = (res) => {
    setClickMaker(res);
  };

  // 입력 시마다 검색 함수에 들어가게 하는 onChange 함수
  const onChange = (e) => {
    setInputText(e.target.value);
    if (InputText.length >= 2) {
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
    console.log(item.target.innerHTML);
    setInputText(item.target.innerHTML);
    setSearch(item.target.innerHTML);
  };

  useEffect(async () => {
    // 마커를 클릭했을 때 장소 이름이 인포윈도우로 뜨는 창
    var infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });
    var markers = [];

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
            displayMarker(data[i]);
            bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
            map.setBounds(bounds);
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
        ClickedMaker(place);
      });
    }

    await axios({
      // 핀조회 axios 요청
      url: `${process.env.REACT_APP_SERVER_URL}/map/pin`,
      method: 'GET',
      params: {
        latitude: 37.57961509140872,
        longitude: 126.97704325823415,
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
      {newStoreClick ? (
        <AddNewStore
          clickMaker={clickMaker}
          userInfo={userInfo}
          handleClickStore={handleClickStore}
        />
      ) : null}
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
              <ul key={item.id} onClick={handleClickPlaceName}>
                {item.place_name}
              </ul>
            ))}
          </div>
        </form>
      </div>
      <div className="with-map-siderbar">
        {isClick ? (
          <StoreList currentMaker={currentMaker} userInfo={userInfo} isLogin={isLogin} newStoreClick={newStoreClick} handleClickStore={handleClickStore} />
        ) : (
          <StoreListSiderBar />
        )}
      <div id="map"></div>
      </div>
    </>
  );
};

export default Map;
