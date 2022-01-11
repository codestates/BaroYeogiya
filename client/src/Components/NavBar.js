import React, { useState } from "react";
import { Link } from 'react-router-dom'
import '../Css/NavBar.css'
import Login from "./Modals/Login";
import SignUp from "./Modals/SignUp";

function NavBar () {
  const [loginModalBtn, setLoginModalBtn] = useState(false)
  const [signUpModalBtn, setSignUpModalBtn] = useState(false)

  const handleLoginBtn = (bool) => {
    setLoginModalBtn(bool);
  };

  const handleSignUpBtn = (bool) => {
    setSignUpModalBtn(bool);
  };

  return(
    <>
      {loginModalBtn ? <Login handleLoginBtn={handleLoginBtn} /> : null }
      {signUpModalBtn ? <SignUp handleSignUpBtn={handleSignUpBtn} /> : null}
      <div className="nav-box">
        <button className='bt'>로고</button>
        <button className='bt' >지도</button>
        <button className='bt' onClick={ () => handleLoginBtn(true) } >로그인</button>
        <button className='bt' onClick={() => handleSignUpBtn(true)} >회원가입</button>
      </div>
    </>
  )
}

export default NavBar;