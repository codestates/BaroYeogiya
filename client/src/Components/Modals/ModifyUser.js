import React, { useState } from 'react';
import axios from 'axios';
import '../../Css/ModifyUser.css';
import FooterBar from '../FooterBar';
export default function MoidfyUser({ userInfo }) {
  const [modifyInfo, setModifyInfo] = useState({
    name: '',
    currentpw: '',
    modifiedpw: '',
    modifiedpwconfirm: '',
  });
  const token = userInfo.accessToken.data.accessToken;
  const [errorMessage, setErrorMessage] = useState('');
  console.log(token);
  const handleInputValue = (key) => (e) => {
    setModifyInfo({ ...modifyInfo, [key]: e.target.value });
  };

  const handleModify = () => {
    const { name, currentpw, modifiedpw, modifiedpwconfirm } = modifyInfo;
    if ((!name || !currentpw || !modifiedpw, !modifiedpwconfirm)) {
      setErrorMessage(
        '변경할 닉네임, 현재 비밀번호, 변경할 비밀번호, 비밀번호 확인을 모두 입력해야합니다.'
      );
    } else if (name.length > 10) {
      setErrorMessage('변경할 닉네임은 10글자 이내로 입력해야합니다.');
    } else if (modifiedpw.length < 8 || modifiedpwconfirm.length < 8) {
      setErrorMessage('변경할 비밀번호는 8글자 이상 입력해야합니다.');
    } else if (modifiedpw !== modifiedpwconfirm) {
      setErrorMessage('입력하신 비밀번호와 비밀번호 확인이 일치하지 않습니다.');
    } else {
      axios({
        method: 'GET',
        url: `${process.env.REACT_APP_SERVER_URL}/user/pw-confirm`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          pw: currentpw,
        },
      })
        .then((result) => {
          if (result.status === 200) {
            //이 경우에만 회원정보 수정
            console.log('Success');
            axios({
              method: 'PATCH',
              url: `${process.env.REACT_APP_SERVER_URL}/user`,
              headers: {
                Authorization: `Bearer ${token}`,
              },
              data: {
                pw: modifiedpw,
                name,
              },
            })
              .then((result) => {
                if (result.status === 200) {
                  setErrorMessage('회원정보가 수정되었습니다.');
                }
              })
              .catch((err) => {
                if (err.response.status === 400) {
                  setErrorMessage('존재하지 않는 유저입니다.');
                } else {
                  setErrorMessage('유효하지 않은 접근입니다.');
                }
              });
          }
        })
        .catch((err) => {
          if (err.response.status === 400) {
            setErrorMessage('현재 비밀번호를 다시 입력해주세요.');
          } else if (err.response.status === 401) {
            setErrorMessage('유효하지 않은 접근입니다.');
          }
        });
    }
  };
  return (
    <>
      <div className="modifyuser-box">
        <center>
          <h2 id="signup-title">회원정보 수정</h2>
          <form onSubmit={(e) => e.preventDefault()}>
            <div>
              변경할 닉네임
              <div className="input-field">
                <input
                  type="text"
                  onChange={handleInputValue('name')}
                  className="input-width"
                  placeholder="사용하실 닉네임을 입력해주세요."
                />
              </div>
            </div>
            <div>
              현재 비밀번호
              <div className="password-field">
                <input
                  type="password"
                  onChange={handleInputValue('currentpw')}
                  className="input-width"
                  placeholder="비밀번호"
                />
              </div>
            </div>
            <div>
              변경할 비밀번호
              <div className="password-field">
                <input
                  type="password"
                  onChange={handleInputValue('modifiedpw')}
                  className="input-width"
                  placeholder="비밀번호 확인"
                />
              </div>
            </div>
            <div>
              비밀번호 확인
              <div className="password-field">
                <input
                  type="password"
                  onChange={handleInputValue('modifiedpwconfirm')}
                  className="input-width"
                  placeholder="비밀번호 확인"
                />
              </div>
            </div>
            <button className="btn" type="submit" onClick={handleModify}>
              회원정보 수정
            </button>
            <div className="alert-box">{errorMessage}</div>
          </form>
        </center>
        <FooterBar />
      </div>
    </>
  );
}
