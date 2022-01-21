import axios from 'axios';
import { useEffect } from 'react';
import '../Css/SectionCard.css'

const SectionCard = ({ like, userInfo, searchMyStore }) =>{

  const { kakao } = window;

  const deleteMyStore = () => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      const token = userInfo.accessToken.data.accessToken;
      axios({
        url: `${process.env.REACT_APP_SERVER_URL}/store/${like.store_uuid}`,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      }).then((res) => {
        if (res.status === 200) {
          alert('찜 해제에 성공했습니다.');
          searchMyStore();
        } else if (res.status === 401) {
          alert('액세스 토큰이 만료되었습니다.');
        }
      });
    }
  };

  useEffect(() => {
    // 마커가 표시될 위치입니다 
    let markerPosition  = new kakao.maps.LatLng(like.latitude, like.longitude); 

    let mapContainer = document.getElementById(`card-${like.num}`), // 지도를 표시할 div 
      mapOption = { 
        center: markerPosition, // 지도의 중심좌표
        level: 4 // 지도의 확대 레벨
    };

    // 지도를 표시할 div와  지도 옵션으로  지도를 생성합니다
    let map = new kakao.maps.Map(mapContainer, mapOption); 

    // 마커를 생성합니다
    let marker = new kakao.maps.Marker({
        position: markerPosition
    });

    // 마커가 지도 위에 표시되도록 설정합니다
    marker.setMap(map);
  })
  
  return(
    <>
      <div className="store-card-box">
        {/* <img className="my-img-box"></img> */}
        <div id={`card-${like.num}`} className="my-store-map"></div>
        <p className="my-store-name">{like.address}</p>
        <button onClick={deleteMyStore}>삭제하기</button>
      </div>
    </>
  )
}
export default SectionCard;