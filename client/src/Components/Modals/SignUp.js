import React, { useState } from 'react'
import axios from 'axios'



export default function SignUp({handleSignUpBtn}) {
 const [signUpInfo, setSignUpInfo] = useState({
     id: '',
     pw: '',
     pwconfirm: '',
     name: '',
 })
 const [errorMessage,setErrorMessage] = useState('')
 const [usermodal, setUserModal] = useState(false);
 const handleInputValue = (key) => (e) => {
     setSignUpInfo({ ...signUpInfo, [key]: e.target.value })
 }
 
 const handleSignUp = () => {  
     const { id, pw, name, pwconfirm } = signUpInfo;
     if(!id || !pw || !name || !pwconfirm) {
        setErrorMessage('id, 닉네임, 비밀번호, 비밀번호 확인을 모두 입력해야합니다.')
     }
     else if(name.length > 10) {
         setErrorMessage('닉네임은 10글자 이내로 입력해야합니다.')
     }
     else if(pw.length < 8 || pwconfirm.length < 8) {
         setErrorMessage('비밀번호는 8글자 이상 입력해야합니다.')
     } 
     else if(pw !== pwconfirm) {
         setErrorMessage('비밀번호가 일치하지 않습니다.')
     }
     else {
        axios({
            method: 'POST',
            url: `${process.env.REACT_APP_SERVER_URL}/user`,
            data: {
              id,
              name,
              pw,
            },
          })
            .then((result) => {
              if (result.status === 200) {  
                // Post 요청 날렸을 시, 돌아오는 데이터의 id와 요청을 보낸 id가 같은지 확인한 후
                // 다른 아이디 기입하라고 에러메세지 띄우기(?)
                setErrorMessage('이미 동일한 id가 존재합니다.')
              }
              else if (result.status === 201) {
                setUserModal(true);
                setErrorMessage('가입이 완료되었습니다.')
                handleSignUpBtn();
                // 회원가입 성공 => 모달창 종료
              }
            })
            .catch((err) => {
              if (err.response.status === 400) {
                setErrorMessage('입력되지 않은 값이 존재합니다.');
              }
            });
     }
 }
 return (
     <>
     <center>
        <h2 id="signup-title">
            회원가입
        </h2>
        <form onSubmit={(e) => e.preventDefault()}>
        <div>id
        <div className="input-field">
        <input
                type="text"
                onChange={handleInputValue('id')}
                className="input-width"
                placeholder="사용하실 id를 입력해주세요."
        />
        </div>
        </div>
        <div>닉네임
        <div className="input-field">
              <input
                type="text"
                onChange={handleInputValue('name')}
                className="input-width"
                placeholder="사용하실 닉네임을 입력해주세요."
              />
        </div>
        </div>
         <div>비밀번호  
            <div className="password-field">
              <input
                type="password"
                onChange={handleInputValue('pw')}
                className="input-width"
                placeholder="비밀번호"
              />
            </div>
            </div> 
            <div>비밀번호 확인
            <div className="password-field">
              <input
                type="password"
                onChange={handleInputValue('pwconfirm')}
                className="input-width"
                placeholder="비밀번호 확인"
              />
            </div>
            </div>
            <div className="btn" type="submit" onClick={handleSignUp}>
              회원가입
            </div>
            <div className="alert-box">{errorMessage}</div>
          </form>
     </center>
     </>
 )
}