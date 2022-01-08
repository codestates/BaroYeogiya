import React, { useState } from 'react'
import axios from 'axios'

axios.defaults.withCredentials = true;

export default function WithDrawal() {
    const [checkPassword, setCheckPassword] = useState({
        pw: '',
      });
 const [errorMessage, setErrorMessage] = useState('')
 const [isModal, setModal] = useState(false);
 const handleInputValue = (key) => (e) => {
     setCheckPassword({ ...checkPassword, [key]: e.target.value })
 }
 
 const requestWithDrawal = () => {  
     const { pw } = checkPassword
     if(!pw) {
         setErrorMessage('비밀번호를 입력해주세요.')
     }
     else {
         // 회원탈퇴 axios 요청
         // 탈퇴 완료되면 isModal True로 변경(?)
     }
 }
 return (
     <>
     <center>
        <h2 id="signup-title">
            회원탈퇴
        </h2>
        <form onSubmit={(e) => e.preventDefault()}>
        <div>비밀번호 확인
            <div className="password-field">
              <input
                type="password"
                onChange={handleInputValue('pw')}
                className="input-width"
                placeholder="비밀번호"
              />
            </div>
        </div> 
        <div className="btn" type="submit" onClick={requestWithDrawal}>
              회원탈퇴
        </div>
        <div className="alert-box">{errorMessage}</div>
        </form>
     </center>
     </>
 )
}