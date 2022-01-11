import './App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MainPage from './Pages/MainPage'
import Login from './Components/Modals/Login';
import NavBar from './Components/NavBar';
import Map from './Pages/Map';
import SignUp from './Components/Modals/SignUp';

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [userInfo, setUserInfo] = useState(object);

  const isAuthenticated = () => {
    // 인증에 성공한
    axios.get(`${process.env.REACT_APP_SERVER_URL}/user/login`)
      .then((res) => {
        setUserInfo(res.data.accessToken);
        // accessToken이 문자열로 들어오는지? 아니면 내가 json화 시켜줘야 하는지?
        setIsLogin(true)
        // userNavigate('/Map')
        // navigate는 지호님이 만들어주면 그때 다시 연결 하는걸로
      })
  };
  const handleResponse = () => {
    isAuthenticated()
  };

  useEffect(() => {
    isAuthenticated()
  },[]);

  return
}

export default App;
