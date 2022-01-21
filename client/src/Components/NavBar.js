import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../Css/NavBar.css';
import Login from './Modals/Login';
import SignUp from './Modals/SignUp';
import { useNavigate } from 'react-router-dom';
import '../Css/Toggle.css';

// 로그인시 나타나는 헤더
const UserHeader = ({
  handleInitializeMypage,
  onLogout,
  navigate,
  onMenu,
}) => (
  <>
    <div className="nav-box">
      <div className="logo-img-box">
        <a className="bt" onClick={() => navigate('/')}>
          BaroYeogiya
        </a>
      </div>
      <div className="nav-menue-box">
        <a onClick={() => navigate('/mappage')} className="bt">
          지도
        </a>
        <Link to="/mypage">
          <a onClick={handleInitializeMypage} className="bt">
            마이페이지
          </a>
        </Link>
        <a className="bt" onClick={() => onLogout()}>
          로그아웃
        </a>
        <img id='img-box' onClick={() => onMenu()}></img>
      </div>
    </div>
  </>
);

// 게스트 헤더
const GuestHeader = ({
  navigate,
  handleLoginBtn,
  handleSignUpBtn,
  onMenu,
}) => (
  <div className="nav-box">
    <div className="logo-img-box">
      <a className="bt" onClick={() => navigate('/')}>
        BaroYeogiya
      </a>
    </div>
    <div className="nav-menue-box">
      <a onClick={() => navigate('/mappage')} className="bt">
        지도
      </a>
      <a className="bt" onClick={() => handleLoginBtn(true)}>
        로그인
      </a>
      <a className="bt" onClick={() => handleSignUpBtn(true)}>
        회원가입
      </a>
      <img id='img-box' onClick={() => onMenu()}></img>
    </div>
  </div>
);

// 게스트 헤더의 토글
const GuestToggle = ({
  navigate,
  handleLoginBtn,
  handleSignUpBtn,
  onMenu,
}) => (
  <div id="toggle-container">
    <nav id="toggle-box">
      <ul>
        <li
          onClick={() => {
            navigate('/mappage');
            onMenu();
          }}
        >
          지도
        </li>
        <li
          onClick={() => {
            handleLoginBtn(true);
            onMenu();
          }}
        >
          로그인
        </li>
        <li
          onClick={() => {
            handleSignUpBtn(true);
            onMenu();
          }}
        >
          회원가입
        </li>
      </ul>
    </nav>
  </div>
);

// 로그인 헤더의 토글
const UserToggle = ({
  handleInitializeMypage,
  onLogout,
  navigate,
  onMenu,
}) => (
  <div id="toggle-container">
    <nav id="toggle-box">
      <ul>
        <li
          onClick={() => {
            navigate('/mappage');
            onMenu();
          }}
        >
          지도
        </li>
        <li
          onClick={() => {
            navigate('/mypage');
            onMenu();
            handleInitializeMypage();
          }}
        >
          My Page
        </li>
        <li
          onClick={() => {
            onLogout();
            onMenu();
          }}
        >
          Logout
        </li>
      </ul>
    </nav>
  </div>
);

function NavBar({
  handleResponse,
  handleIsLogin,
  isLogin,
  handleInitializeMypage,
}) {
  const [loginModalBtn, setLoginModalBtn] = useState(false);
  const [signUpModalBtn, setSignUpModalBtn] = useState(false);
  const [showMenue, setShowMenue] = useState(false); //토글 버튼
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

  const onLogout = () => {
    // props로 받은 함수를 실행하여 상태를 변경 시킨다.
    handleResponse({
      userInfo: null,
    });
    handleIsLogin(false);
  };

  const onMenu = () => {
    // 토글 state 값을 변경
    setShowMenue(!showMenue);
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

      {showMenue ? ( // 값이 true일때 토글을 보여준다
        <GuestToggle
          onMenu={onMenu}
          navigate={navigate}
          handleLoginBtn={handleLoginBtn}
          handleSignUpBtn={handleSignUpBtn}
        />
      ) : null}

      {showMenue && isLogin ? ( //토글 state 값이 true일때, 로그인 state 값이 true일때 토글을 보여준다
        <UserToggle
          onMenu={onMenu}
          onLogout={onLogout}
          handleInitializeMypage={handleInitializeMypage}
          navigate={navigate}
        />
      ) : null}

      {isLogin ? (
        <UserHeader
          onMenu={onMenu}
          onLogout={onLogout}
          handleInitializeMypage={handleInitializeMypage}
          navigate={navigate}
        />
      ) : (
        <GuestHeader
          onMenu={onMenu}
          navigate={navigate}
          handleLoginBtn={handleLoginBtn}
          handleSignUpBtn={handleSignUpBtn}
        />
      )}
    </>
  );
}

export default NavBar;
