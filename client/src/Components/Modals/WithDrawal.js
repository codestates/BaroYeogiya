import React, { useState } from 'react';
import axios from 'axios';
import '../../Css/WithDrawal.css';
import { useNavigate } from 'react-router';

axios.defaults.withCredentials = true;

export default function WithDrawal({ userInfo }) {
  const [checkPassword, setCheckPassword] = useState({
    pw: '',
  });
  const navigate = useNavigate();
  const token = userInfo.accessToken.data.accessToken;
  const [errorMessage, setErrorMessage] = useState('');
  const [isModal, setModal] = useState(false);
  const handleInputValue = (key) => (e) => {
    setCheckPassword({ ...checkPassword, [key]: e.target.value });
  };

  const requestWithDrawal = () => {
    const { pw } = checkPassword;
    if (!pw) {
      setErrorMessage('비밀번호를 입력해주세요.');
    } else {
      // 비밀번호 확인 요청
      axios({
        method: 'GET',
        url: `${process.env.REACT_APP_SERVER_URL}/user/pw-confirm`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          pw,
        },
      })
        .then((result) => {
          if (result.status === 200) {
            console.log('Success');
            axios({
              method: 'DELETE',
              url: `${process.env.REACT_APP_SERVER_URL}/user`,
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
              .then((result) => {
                if (result.status === 200) {
                  setErrorMessage('회원탈퇴가 완료되었습니다.');
                  // alert창 띄우고(Confrim창), 확인 누르면 메인페이지로 쫓아내기
                  navigate('/');
                  // 여기서 isLogin state를 false로 바꾸기
                }
              })
              .catch((err) => {
                if (err.response.status === 400) {
                  setErrorMessage('비정상적인 접근입니다.');
                } else if (err.response.status === 401) {
                  setErrorMessage('유효하지 않은 접근입니다.');
                }
              });
          }
        })
        .catch((err) => {
          if (err.response.status === 400) {
            setErrorMessage('비밀번호가 일치하지 않습니다.');
          } else if (err.response.status === 401) {
            setErrorMessage('유효하지 않은 접근입니다.');
          }
        });
    }
  };
  return (
    <div className="withdrawal-box">
      <center>
        <h2 id="signup-title">회원탈퇴</h2>
        <form onSubmit={(e) => e.preventDefault()}>
          <div>
            비밀번호 확인
            <div className="password-field">
              <input
                type="password"
                onChange={handleInputValue('pw')}
                className="input-width"
                placeholder="비밀번호"
              />
            </div>
          </div>
          <button className="btn" type="submit" onClick={requestWithDrawal}>
            회원탈퇴
          </button>
          <div className="alert-box">{errorMessage}</div>
        </form>
      </center>
    </div>
  );
}
