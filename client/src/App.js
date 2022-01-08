import './App.css';
import React, { useEffect, useState } from 'react';
import Login from './Components/Modals/Login';
import axios from 'axios';
import MainPage from './Pages/MainPage'

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [userInfo, setUserInfo] = useState(object);

  const isAuthenticated = () => {
    // 인증에 성공한
    axios.get('54.180.108.24/user/login')
      .then((res) => {
        setUserInfo(res.data);
        setIsLogin(true)
        // navigate('/')
      })
  };
  const handleResponse = () => {
    isAuthenticated()
  };

  useEffect(() => {
    isAuthenticated()
  },[]);

  return (
    <>
      {isLogin? <MainPage isLogin={isLogin} /> :
        <Login
          userInfo={userInfo}
          handleResponse={handleResponse}
        />
      }
      
    </>
  );
}

export default App;
