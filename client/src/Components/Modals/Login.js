import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../Css/Login.css';

function Login({ getResponse, handleLoginBtn, getLoging, handleCloseLogin }) {
  // handleLoginBtn은 NavBar에서 오고 handleResponse는 app.js에서 온다. userInfo도 app.js에서 넘어 올거다
  // userInfo는 access_token 실은 정보
  const [LoginId, setLoginId] = useState('');
  const [LoginPw, setLoginPw] = useState('');

  const handleLoginId = (e) => {
    setLoginId(e.target.value);
  };

  const handleLoginPw = (e) => {
    setLoginPw(e.target.value);
  };

  const onClickLogin = () => {
    // console.log('Click?')
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
        if (res.status === 400) {
          alert('아이디와 비밀번호의 정보가 일치하지 않습니다.');
        } else if (res.status === 200) {
          getResponse(res);
          getLoging(true);
          handleLoginBtn(false);
        }
      })
      .catch((error) => {
        return error;
      });
  };

  return (
    <div className="login-entire-box">
      <div className="login-box">
        <div className="close-login" onClick={handleCloseLogin}>
          X
        </div>
        <h1>로그인</h1>
        <div className="input-id">
          <p>ID</p>
          <input className="input-id" type="text" onChange={handleLoginId} />
        </div>
        <div className="input-pw">
          <p>PW</p>
          <input
            className="input-pw"
            type="password"
            onChange={handleLoginPw}
          />
        </div>
        <button className="login-bt" onClick={onClickLogin}>
          로그인
        </button>
      </div>
    </div>
  );
}
export default Login;
