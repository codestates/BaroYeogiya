import React, { useState } from 'react';
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
  if (!withDrawalModal && !modifyModal && !cartlistModal) {
    return (
      <>
        <button className="cartlist-button" onClick={handleCartlistModal}>
          찜 목록
        </button>
        <UserInfo
          userInfo={userInfo}
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
        <ModifyUser userInfo={userInfo} />
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
        <button onClick={handleCartlistModal}>찜 목록</button>
        <CartList userInfo={userInfo} />
      </>
    );
  }
  return (
    <>
      <Mypage />
    </>
  );
}
