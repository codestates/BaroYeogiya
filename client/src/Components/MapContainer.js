import React, { useEffect, useState } from 'react';
import LandingPage from './LandingPage';

const { kakao } = window;

const MapContainer = () => {
  // 입력 칸(검색어를 입력하세요 부분)에 들어가는 문자열 state
  const [InputText, setInputText] = useState('');
  // 장소 입력에 들어가는 입력값
  const [search, setSearch] = useState('');
  // 입력 시마다 검색 함수에 들어가게 하는 onChange 함수
  const onChange = (e) => {
    setInputText(e.target.value);
    if (e.target.value.length >= 2) {
      setSearch(e.target.value); // 이 입력되는 값을 searchPlace로 줘야함
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
  useEffect(() => {
    var infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });
    var markers = [];
    const container = document.getElementById('myMap');
    const options = {
      center: new kakao.maps.LatLng(33.450701, 126.570667),
      level: 3,
    };
    const map = new kakao.maps.Map(container, options);

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
    // 지도 위에 마커 찍는 함수
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
      });
    }
  }, [search]);

  return (
    <div>
      <form className="inputForm">
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
      <div
        id="myMap"
        style={{
          width: '500px',
          height: '500px',
        }}
      ></div>
      {/* <div id="result-list">
        {Places.map((item, i) => (
          <div key={i} style={{ marginTop: '20px' }}>
            <span>{i + 1}</span>
            <div>
              <h5>{item.place_name}</h5>
              {item.road_address_name ? (
                <div>
                  <span>{item.road_address_name}</span>
                  <span>{item.address_name}</span>
                </div>
              ) : (
                <span>{item.address_name}</span>
              )}
              <span>{item.phone}</span>
            </div>
          </div>
        ))}
        <div id="pagination"></div>
      </div> */}
    </div>
  );
};

export default MapContainer;
