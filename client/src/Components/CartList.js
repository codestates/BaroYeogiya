import * as React from 'react';
import axios from 'axios';

function CartList({ like, userInfo }) {
  const token = userInfo.accessToken.data.accessToken;

  const deleteMyStore = () => {
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

  return (
    <>
      <p className="hello">hello</p>
      <div className="store-card-box">
        <img className="my-img-box"></img>
        <p className="my-store-name">{like.address}</p>
        <p onClick={deleteMyStore}>X</p>
      </div>
    </>
  );
}

export default CartList;
