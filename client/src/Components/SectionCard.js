import axios from 'axios';

const SectionCard = ({ like, userInfo }) =>{

  const deleteMyStore = () => {
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
      } else if (res.status === 401) {
        alert('액세스 토큰이 만료되었습니다.');
      }
    });
  };
  
  return(
    <>
      <div className="store-card-box">
        <img className="my-img-box"></img>
        <p className="my-store-name">{like.address}</p>
        <p onClick={deleteMyStore}>X</p>
      </div>
    </>
  )
}
export default SectionCard;