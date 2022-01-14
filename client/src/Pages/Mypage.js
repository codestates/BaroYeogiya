import React, { useState } from 'react';
import WithDrawal from '../Components/Modals/WithDrawal';
import ModifyUser from '../Components/Modals/ModifyUser';
import UserInfo from '../Components/UserInfo';

// 마이페이지 컴포넌트
export default function Mypage({
  userInfo,
  handleModifyModal,
  handleWithDrawalModal,
  withDrawalModal,
  modifyModal,
  handleIsLogin,
}) {
  if (!withDrawalModal && !modifyModal) {
    return (
      <UserInfo
        userInfo={userInfo}
        handleWithDrawalModal={handleWithDrawalModal}
        handleModifyModal={handleModifyModal}
      />
    );
  } else if (modifyModal && !withDrawalModal) {
    return <ModifyUser userInfo={userInfo} />;
  } else if (!modifyModal && withDrawalModal) {
    return <WithDrawal userInfo={userInfo} handleIsLogin={handleIsLogin} />;
  }
  return (
    <>
      <Mypage />
    </>
  );
}
