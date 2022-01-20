import React, { useState } from 'react';
import axios from 'axios';
import WithDrawal from '../Components/Modals/WithDrawal';
import ModifyUser from '../Components/Modals/ModifyUser';
import UserInfo from '../Components/UserInfo';
import CartList from '../Components/CartList';
import FooterBar from '../Components/FooterBar';
import '../Css/MyPage.css';

// 마이페이지 컴포넌트
export default function Mypage({
  userInfo,
  handleModifyModal,
  handleWithDrawalModal,
  handleCartlistModal,
  cartlistModal,
  withDrawalModal,
  modifyModal,
  handleIsLogin,
  handleResponse,
}) {
  const token = userInfo.accessToken.data.accessToken;

  const [userName, setUserName] = useState('');

  const handleUserName = (name) => {
    setUserName(name);
  };
  const [myList, setMylist] = useState([]);

  const likeStore = () => {
    // 찜한 매장 조회
    axios({
      url: `${process.env.REACT_APP_SERVER_URL}/store/my-list`,
      method: 'GET',
      params: {
        // offset :
        // limit :
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    })
      .then((res) => {
        if (res.status === 200) {
          const getStore = res.data.data;

          for (let i = 0; i < getStore.length; i++) {
            const likeMyStore = getStore[i];
            console.log('likeMyStore', likeMyStore);
            setMylist((current) => [...current, likeMyStore]);
          }
        } else if (res.status === 400) {
          alert('존재하지 않는 유저입니다.');
        } else if (res.status === 401) {
          alert('액세스 토큰이 만료되었습니다.');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  console.log(withDrawalModal, modifyModal, cartlistModal);
  if (!withDrawalModal && !modifyModal && !cartlistModal) {
    return (
      <>
        <button
          className="cartlist-button"
          onClick={() => {
            handleCartlistModal();
            likeStore();
          }}
        >
          찜 목록
        </button>
        <UserInfo
          userInfo={userInfo}
          userName={userName}
          handleUserName={handleUserName}
          handleWithDrawalModal={handleWithDrawalModal}
          handleModifyModal={handleModifyModal}
          handleResponse={handleResponse}
          handleIsLogin={handleIsLogin}
        />
      </>
    );
  } else if (modifyModal && !withDrawalModal && !cartlistModal) {
    return (
      <>
        <button onClick={handleCartlistModal}>찜 목록</button>
        <ModifyUser userName={userName} userInfo={userInfo} />
      </>
    );
  } else if (!modifyModal && !cartlistModal && withDrawalModal) {
    return (
      <>
        <button onClick={handleCartlistModal}>찜 목록</button>
        <WithDrawal userInfo={userInfo} handleIsLogin={handleIsLogin} />
      </>
    );
  } else if (!modifyModal && !withDrawalModal && cartlistModal) {
    return (
      <>
        <div className="cart-list-view">
          <button className="my-list-bt" onClick={handleCartlistModal}>
            찜 목록
          </button>
          <div className="store-card-container">
            {myList.map((like) => (
              <CartList like={like} userInfo={userInfo} />
            ))}
          </div>
        </div>
      </>
    );
  }
  return (
    <>
      <Mypage />
    </>
  );
}
