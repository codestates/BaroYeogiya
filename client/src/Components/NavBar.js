import React, { useState } from 'react';
// import { Link } from 'react-router-dom'
import '../Css/NavBar.css';
import Login from './Modals/Login';
import SignUp from './Modals/SignUp';
import { useNavigate } from 'react-router-dom';

function NavBar({ handleResponse, handleIsLogin }) {
  const [loginModalBtn, setLoginModalBtn] = useState(false);
  const [signUpModalBtn, setSignUpModalBtn] = useState(false);
  const navigate = useNavigate();
  const handleLoginBtn = (bool) => {
    setLoginModalBtn(bool);
  };

  const handleSignUpBtn = (bool) => {
    setSignUpModalBtn(bool);
  };
  const handleCloseSignUp = () => {
    setSignUpModalBtn(false);
  };
  const handleCloseLogin = () => {
    setLoginModalBtn(false);
  };
  const getResponse = (res) => {
    handleResponse(res);
  };

  const getLoging = (bool) => {
    handleIsLogin(bool);
  };

  return (
    <>
      {loginModalBtn ? (
        <Login
          handleLoginBtn={handleLoginBtn}
          getResponse={getResponse}
          getLoging={getLoging}
          handleCloseLogin={handleCloseLogin}
        />
      ) : null}
      {signUpModalBtn ? (
        <SignUp
          handleSignUpBtn={handleSignUpBtn}
          handleCloseSignUp={handleCloseSignUp}
        />
      ) : null}
      {/* 모달창을 페이지 위에 나타나고 버튼을 클릭 시 상태를 변경 함으로써 원래 상태로 돌아가게 한다. */}
      <div className="nav-box">
        <div onClick={() => navigate('/')} className="logo-img-box">
          <button className="bt">로고</button>
        </div>
        <div className="nav-menue-box">
          <div className="menue-box">
            <button onClick={() => navigate('/mappage')} className="bt">
              지도
            </button>
            <button className="bt" onClick={() => handleLoginBtn(true)}>
              로그인
            </button>
            <button className="bt" onClick={() => handleSignUpBtn(true)}>
              회원가입
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default NavBar;
