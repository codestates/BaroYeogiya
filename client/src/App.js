import './App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MainPage from './Pages/MainPage'
import NavBar from './Components/NavBar'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Mypage from './Pages/Mypage'
import Map from './Pages/Map'

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


  return (
    <div className="App">
      <Router>
        <NavBar />
        <Routes>
          <Route
            exact
            path="/"
            element={
              <MainPage />
            }
          ></Route> 
          <Route
            exact
            path="/mypage"
            element={
              <Mypage />
            }
          ></Route>
          <Route 
            exact
            path="/mappage"
            element={
              <Map />
            }></Route>
        </Routes>
      </Router>
      </div>
  );
}

export default App;
