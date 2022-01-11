import React, { useState, useEffect } from "react";
import axios from 'axios'
import '../../Css/Login.css'

function Login({ handleResponse, handleLoginBtn}) {
  // handleLoginBtn은 NavBar에서 오고 handleResponse는 app.js에서 온다. userInfo도 app.js에서 넘어 올거다
  // userInfo는 access_token 실은 정보
  const [LoginId, setLoginId] = useState('')
  const [LoginPw, setLoginPw] = useState('')

  const handleLoginId = (e) => {
    setLoginId(e.target.value)
  }

  const handleLoginPw = (e) => {
    setLoginPw(e.target.value)
  }

  const onClickLogin = () => {
    // console.log('Click?')
    axios({
      url: `${process.env.REACT_APP_SERVER_URL}/user/login`,
      method: 'GET',
      params: {
        id: LoginId,
        pw: LoginPw
      },
      withCredentials: true
    })
    .then(res => {
      if(res.params.id !== LoginId || res.params.pw !== LoginPw ){
        alert('Does not match id or password.')
      }
      handleResponse();
      console.log(handleResponse())
      handleLoginBtn();
      // 왜 여기서 두 함수가 같이 실행이 안될까?? 둘 중 한가지만 넣어야 잘 작동이 된다...이유는?
    })
    .catch((error)=>{
      return error;
    })
  };

  useEffect( () => {
    // axios.get('/user/login')
    //   .then(res => console.log(res))
    //   .catch()
    onClickLogin();
  },[])

  return (
    <div className="login-box">
      <h1>로그인</h1>
      <div className="input-id">
          <p>ID</p>
          <input className="input-id" type="text" onChange={handleLoginId} />
      </div>
      <div className="input-pw">
        <p>PW</p>
        <input className="input-pw" type="password" onChange={handleLoginPw} />
      </div>
      <button className="login-bt" onClick={onClickLogin} >로그인</button>
    </div>
  )
}
export default Login