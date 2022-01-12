import React, { useEffect } from "react";
import '../Css/Map.css'
import { Link } from "react-router-dom";

const { kakao } = window;

const Map = () => {

  useEffect(() => {
    const container = document.getElementById('map');
    const options = {
      center: new kakao.maps.LatLng(37.365264512305174, 127.10676860117488),
      level: 3
    };
    const map = new kakao.maps.Map(container, options);
    const markerPosition = new kakao.maps.LatLng(37.365264512305174, 127.10676860117488);
    const marker = new kakao.maps.Marker({
      position: markerPosition
    });
    marker.setMap(map);
  }, [])


  return (
    <>
      <div className="map-nav-bar">
        {/* <button>로고</button>
        <input className="location-search" type="text" placeholder="검색:" size="30"></input>
        <button>마이페이지</button> */}
      </div>
      <div id="map"></div>
    </>
  )
}

export default Map;