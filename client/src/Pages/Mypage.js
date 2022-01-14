import React, { useState } from 'react';
import WithDrawal from '../Components/Modals/WithDrawal';
import ModifyUser from '../Components/Modals/ModifyUser';
import UserInfo from '../Components/UserInfo';

// 마이페이지 컴포넌트
export default function Mypage({ userInfo }) {
  const [withDrawalModal, setWithDrawlalModal] = useState(false);
  const [modifyModal, setModifyModal] = useState(false);
  const handleWithDrawalModal = () => {
    setWithDrawlalModal(true);
    setModifyModal(false);
  };

  const handleModifyModal = () => {
    setModifyModal(true);
    setWithDrawlalModal(false);
  };
  const handleInitializeMypage = () => {
    setModifyModal(false);
    setWithDrawlalModal(false);
  };

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
    return <WithDrawal userInfo={userInfo} />;
  }
  return (
    <>
      <Mypage />
    </>
  );
}
