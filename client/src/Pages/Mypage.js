import React, { useEffect, useState } from 'react';
import axios from 'axios';
import WithDrawal from '../Components/Modals/WithDrawal';
import ModifyUser from '../Components/Modals/ModifyUser';
import UserInfo from '../Components/UserInfo';
import CartList from '../Components/CartList';
import '../Css/MyPage.css';

// 마이페이지 컴포넌트
export default function Mypage({
  userInfo,
  handleModifyModal,
  handleWithDrawalModal,
  handleCartlistModal,
  handleInitializeMypage,
  cartlistModal,
  withDrawalModal,
  modifyModal,
  handleIsLogin,
  handleResponse,
}) {

  const [userName, setUserName] = useState('');
  const [tabActiveUser, setTabActiveUser] = useState('active');
  const [tabActiveCart, setTabActiveCart] = useState('');

  const handleUserName = (name) => {
    setUserName(name);
  };
  
  if (!withDrawalModal && !modifyModal && !cartlistModal) {
    return (
      <>
        <div className="info-tab-box">
          <p
            className={tabActiveUser}
            onClick={() => {
              setTabActiveUser('active');
              setTabActiveCart('');
              handleInitializeMypage();
            }}
          >
            회원 정보
          </p>
          <p
            className={tabActiveCart}
            onClick={() => {
              setTabActiveUser('');
              setTabActiveCart('active');
              handleCartlistModal();
            }}
          >
            찜 목록
          </p>
        </div>
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
        <div className="info-tab-box">
          <p
            className={tabActiveUser}
            onClick={() => {
              setTabActiveUser('active');
              setTabActiveCart('');
              handleInitializeMypage();
            }}
          >
            회원 정보
          </p>
          <p
            className={tabActiveCart}
            onClick={() => {
              setTabActiveUser('');
              setTabActiveCart('active');
              handleCartlistModal();
            }}
          >
            찜 목록
          </p>
        </div>
        <ModifyUser userName={userName} userInfo={userInfo} />
      </>
    );
  } else if (!modifyModal && !cartlistModal && withDrawalModal) {
    return (
      <>
        <div className="info-tab-box">
          <p
            className={tabActiveUser}
            onClick={() => {
              setTabActiveUser('active');
              setTabActiveCart('');
              handleInitializeMypage();
            }}
          >
            회원 정보
          </p>
          <p
            className={tabActiveCart}
            onClick={() => {
              setTabActiveUser('');
              setTabActiveCart('active');
              handleCartlistModal();
            }}
          >
            찜 목록
          </p>
        </div>
        <WithDrawal userInfo={userInfo} handleIsLogin={handleIsLogin} />
      </>
    );
  } else if (!modifyModal && !withDrawalModal && cartlistModal) {
    return (
      <>
        <div className="info-tab-box">
          <p
            className={tabActiveUser}
            onClick={() => {
              setTabActiveUser('active');
              setTabActiveCart('');
              handleInitializeMypage();
            }}
          >
            회원 정보
          </p>
          <p
            className={tabActiveCart}
            onClick={() => {
              setTabActiveUser('');
              setTabActiveCart('active');
              handleCartlistModal();
            }}
          >
            찜 목록
          </p>
        </div>
        <div className="store-card-container">
          <CartList userInfo={userInfo} />
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
