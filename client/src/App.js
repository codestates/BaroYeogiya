import './App.css';
import React, { useEffect, useState } from 'react';
import Login from './Components/Modals/Login';
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
