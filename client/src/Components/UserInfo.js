import React, { useState } from 'react';
import WithDrawal from '../Components/Modals/WithDrawal';
import { useEffect } from 'react';
import ModifyUser from '../Components/Modals/ModifyUser';
import '../Css/UserInfo.css';
import axios from 'axios';
import FooterBar from './FooterBar';
export default function UserInfo({
  userInfo,
  handleWithDrawalModal,
  handleModifyModal,
}) {
  const [userId, setUserId] = useState('');
  const [userName, setUserName] = useState('');

  const token = userInfo.accessToken.data.accessToken;
  console.log(token);
  const [errorMessage, setErrorMessage] = useState('');

  const userInfoRequest = () => {
    axios({
      method: 'GET',
      url: `${process.env.REACT_APP_SERVER_URL}/user`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((result) => {
        const id = result.data.data.id;
        const name = result.data.data.name;
        if (result.status === 200) {
          //불러와졌을 경우
          setUserId(id);
          setUserName(name);
        }
      })
      .catch((err) => {
        if (err.response.status === 400) {
          setErrorMessage('유효하지 않은 사용자입니다.');
        } else {
          setErrorMessage('잘못된 접근입니다.');
        }
      });
  };

  useEffect(() => {
    userInfoRequest();
  }, []);
  return (
    <div className="userinfo-box">
      <center>
        <h2 id="signup-title">회원정보</h2>
        <div>
          이름
          <div>{userName ? userName : ''}</div>
        </div>
        <div>
          id
          <div>{userId ? userId : ''}</div>
        </div>
        <button
          onClick={() => {
            handleModifyModal();
          }}
        >
          회원정보 수정
        </button>
        <button
          onClick={() => {
            handleWithDrawalModal();
          }}
        >
          회원 탈퇴
        </button>
        <div className="alert-box">{errorMessage}</div>
      </center>
      <FooterBar />
    </div>
  );
}
