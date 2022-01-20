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
  onMenue,
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
        <img id="img-box" onClick={() => onMenue()}></img>
      </div>
    </div>
  </>
);

// 게스트 헤더
const GuestHeader = ({
  navigate,
  handleLoginBtn,
  handleSignUpBtn,
  onMenue,
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
      <img id="img-box" onClick={() => onMenue()}></img>
    </div>
  </div>
);

// 게스트 헤더의 토글
const GuestToggle = ({
  navigate,
  handleLoginBtn,
  handleSignUpBtn,
  onMenue,
}) => (
  <div id="toggle-container">
    <nav id="toggle-box">
      <ul>
        <li
          onClick={() => {
            navigate('/mappage');
            onMenue();
          }}
        >
          지도
        </li>
        <li
          onClick={() => {
            handleLoginBtn(true);
            onMenue();
          }}
        >
          로그인
        </li>
        <li
          onClick={() => {
            handleSignUpBtn(true);
            onMenue();
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
  onMenue,
}) => (
  <div id="toggle-container">
    <nav id="toggle-box">
      <ul>
        <li
          onClick={() => {
            navigate('/mappage');
            onMenue();
          }}
        >
          지도
        </li>
        <li
          onClick={() => {
            navigate('/mypage');
            onMenue();
            handleInitializeMypage();
          }}
        >
          My Page
        </li>
        <li
          onClick={() => {
            onLogout();
            onMenue();
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

  const onMenue = () => {
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
          onMenue={onMenue}
          navigate={navigate}
          handleLoginBtn={handleLoginBtn}
          handleSignUpBtn={handleSignUpBtn}
        />
      ) : null}

      {showMenue && isLogin ? ( //토글 state 값이 true일때, 로그인 state 값이 true일때 토글을 보여준다
        <UserToggle
          onMenue={onMenue}
          onLogout={onLogout}
          handleInitializeMypage={handleInitializeMypage}
          navigate={navigate}
        />
      ) : null}

      {isLogin ? (
        <UserHeader
          onMenue={onMenue}
          onLogout={onLogout}
          handleInitializeMypage={handleInitializeMypage}
          navigate={navigate}
        />
      ) : (
        <GuestHeader
          onMenue={onMenue}
          navigate={navigate}
          handleLoginBtn={handleLoginBtn}
          handleSignUpBtn={handleSignUpBtn}
        />
      )}
    </>
  );
}

export default NavBar;
