import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import Map from './Pages/Map';
// import Login from './Components/Modals/Login';
// import NavBar from './Components/NavBar'
// import MainPage from './Pages/MainPage'
// import SignUp from './Components/Modals/SignUp'
import StoreListSiderBar from './Components/Modals/StoreListSiderBar';
import SelectedStore from './Components/Modals/SelectedStore';
import GuestSelectedStore from './Components/Modals/GuestSelectedStore';
import Mypage from './Pages/Mypage';
import StoreCard from './Components/StoreCard';
import CartList from './Components/CartList';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
