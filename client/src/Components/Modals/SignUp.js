import React, { useState } from 'react';
import axios from 'axios';
import '../../Css/SignUp.css';

export default function SignUp({ handleSignUpBtn, handleCloseSignUp }) {
  const [signUpInfo, setSignUpInfo] = useState({
    id: '',
    pw: '',
    pwconfirm: '',
    name: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [usermodal, setUserModal] = useState(false);
  const handleInputValue = (key) => (e) => {
    setSignUpInfo({ ...signUpInfo, [key]: e.target.value });
  };

  const handleSignUp = () => {
    const { id, pw, name, pwconfirm } = signUpInfo;
    if (!id) {
      setErrorMessage('아이디를 입력해주세요.');
    } else if (!name) {
      setErrorMessage('닉네임을 입력해주세요.');
    } else if (name.length > 10) {
      setErrorMessage('닉네임은 10글자 이내로 입력해주세요.');
    } else if (!pw) {
      setErrorMessage('비밀번호를 입력해주세요.');
    } else if (pw.length < 8) {
      setErrorMessage('비밀번호를 8글자 이상 입력해주세요.');
    } else if (!pwconfirm) {
      setErrorMessage('비밀번호 확인을 입력해주세요.');
    } else if (pw !== pwconfirm) {
      setErrorMessage('비밀번호와 확인이 일치하지 않습니다.');
    } else {
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
            setErrorMessage('이미 동일한 아이디가 존재합니다.');
          } else if (result.status === 201) {
            setUserModal(true);
            setErrorMessage('가입이 완료되었습니다.');
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
  };
  return (
    <>
      <div className="signup-entire-box">
        <div className="signup-box">
          <div className="close-signup" onClick={handleCloseSignUp}>
            <img src="Images/exit.svg"></img>
          </div>
          <div className="signup-form">
            <h2 id="signup-title">회원가입</h2>
            <form onSubmit={(e) => e.preventDefault()}>
              <div>
                <p>아이디</p>
                <div className="input-field">
                  <input
                    type="text"
                    onChange={handleInputValue('id')}
                    className="input-width"
                    placeholder="사용하실 id를 입력해주세요."
                    maxLength="10"
                  />
                </div>
              </div>
              <div>
                <p>닉네임</p>
                <div className="input-field">
                  <input
                    type="text"
                    onChange={handleInputValue('name')}
                    className="input-width"
                    placeholder="사용하실 닉네임을 입력해주세요."
                    maxLength="10"
                  />
                </div>
              </div>
              <div>
                <p>비밀번호</p>
                <div className="password-field">
                  <input
                    type="password"
                    onChange={handleInputValue('pw')}
                    className="input-width"
                    placeholder="비밀번호"
                    maxLength="16"
                  />
                </div>
              </div>
              <div>
                <p>비밀번호 확인</p>
                <div className="password-field">
                  <input
                    type="password"
                    onChange={handleInputValue('pwconfirm')}
                    className="input-width"
                    placeholder="비밀번호 확인"
                    maxLength="16"
                  />
                </div>
              </div>
              <div className="signup-message">{errorMessage}</div>
              <button className="signup-btn" type="submit" onClick={handleSignUp}>
                회원가입
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
