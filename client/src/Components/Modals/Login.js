import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../Css/Login.css';

function Login({ getResponse, handleLoginBtn, getLoging, handleCloseLogin }) {
  // handleLoginBtn은 NavBar에서 오고 handleResponse는 app.js에서 온다. userInfo도 app.js에서 넘어 올거다
  // userInfo는 access_token 실은 정보
  const [LoginId, setLoginId] = useState('');
  const [LoginPw, setLoginPw] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLoginId = (e) => {
    setLoginId(e.target.value);
  };

  const handleLoginPw = (e) => {
    setLoginPw(e.target.value);
  };

  const onClickLogin = () => {
    if (LoginId === '') {
      setErrorMessage('아이디를 입력해주세요.');
    } else if (LoginPw === '') {
      setErrorMessage('비밀번호를 입력해주세요.');
    } else {
      axios({
        url: `${process.env.REACT_APP_SERVER_URL}/user/login`,
        method: 'GET',
        params: {
          id: LoginId,
          pw: LoginPw,
        },
        withCredentials: true,
      })
        .then((res) => {
          getResponse(res);
          getLoging(true);
          handleLoginBtn(false);
        })
        .catch((error) => {
          setErrorMessage('아이디와 비밀번호의 정보가 일치하지 않습니다.');
        });
    }
  };

  return (
    <div className="login-entire-box">
      <div className="login-box">
        <div className="close-login" onClick={handleCloseLogin}>
          <img src="Images/exit.svg"></img>
        </div>
        <div className="login-form">
          <h1>로그인</h1>
          <div className="input-id">
            <p>아이디</p>
            <input className="input-id" type="text" maxLength="10" onChange={handleLoginId} />
          </div>
          <div className="input-pw">
            <p>비밀번호</p>
            <input
              className="input-pw"
              type="password"
              onChange={handleLoginPw}
              maxLength="16"
            />
          </div>
          <div className="login-message">{errorMessage}</div>
          <button className="login-bt" onClick={onClickLogin}>
            로그인
          </button>
        </div>
      </div>
    </div>
  );
}
export default Login;
