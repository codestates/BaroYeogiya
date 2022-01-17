import './App.css';
import React, { useEffect, useState } from 'react';
// import axios from 'axios';
import MainPage from './Pages/MainPage';
import NavBar from './Components/NavBar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Mypage from './Pages/Mypage';
import Map from './Pages/Map';
import UserNavBar from './Components/UserNavBar';
import GuestMap from './Pages/GuestMap'

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  // console.log(isLogin)
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
  const handleResponse = (res) => {
    // accessToken을 받아 와서 state에 저장한다.
    const userInfo = {
      accessToken: res.data, //props로 내려 주기 위해서는 객체 형태로 보내준다.
    };
    setUserInfo(userInfo);
    console.log(res.data);
  };

  const handleIsLogin = (bool) => {
    // login 상태를 알려주는 함수
    setIsLogin(bool); // 원래는 setUserInfo와 함께 함수를 통해서 전달 해주었는데 res 값을 따로 전해 주어야 해서 나누었다.
  };

  // useEffect(() => {
  //   handleResponse()
  // },[]);

  return (
    <div className="App">
      <Router>
        {isLogin ? (
          <UserNavBar
            handleResponse={handleResponse}
            handleIsLogin={handleIsLogin}
            handleInitializeMypage={handleInitializeMypage}
          />
        ) : (
          <NavBar
            handleResponse={handleResponse}
            handleIsLogin={handleIsLogin}
          />
        )}
        {/* isLogin 상태에 따라 로그인된 Nav가 나올지 게스트 Nav가 나올지 정했다. */}
        <Routes>
          <Route
            exact
            path="/"
            element={<MainPage isLogin={isLogin} />}
          ></Route>
          <Route
            exact
            path="/mypage"
            element={
              <Mypage
                userInfo={userInfo}
                handleWithDrawalModal={handleWithDrawalModal}
                handleModifyModal={handleModifyModal}
                withDrawalModal={withDrawalModal}
                modifyModal={modifyModal}
                handleIsLogin={handleIsLogin}
              />
            }
          ></Route>
          <Route 
            exact
            path="/mappage"
            element={
              isLogin ? (
                <Map userInfo={userInfo} />
              ) : (
                <GuestMap isLogin={isLogin} />
              )
            }
          ></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
