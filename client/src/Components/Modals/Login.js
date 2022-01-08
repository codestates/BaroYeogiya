import React, { useState, useEffect } from "react";
import axios from 'axios'


function Login({ handleResponse}) {
  const [LoginId, setLoginId] = useState('')
  const [LoginPw, setLoginPw] = useState('')

  const handleLoginId = (e) => {
    setLoginId(e.target.value)
  }

  const handleLoginPw = (e) => {
    setLoginPw(e.target.value)
  }

  const onClickLogin = async () => {
    console.log('Click?')
    axios({
      url: '54.180.108.24/user/login',
      method: 'get',
      data: {
        user_id: LoginId,
        pw: LoginPw
      },
      withCredentials: true
    })
    .then(res => {
      if(res.data.user_id !== LoginId || res.data.pw !== LoginPw ){
        alert('Does not match id or password.')
      }
      handleResponse()
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
      <button className="login-bt" onClick={onClickLogin}>로그인</button>
    </div>
  )
}
export default Login