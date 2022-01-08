import React, { useState } from "react";
import axios from "axios";

function ModifyUser ({user}) { // 모달창 닫히는 함수 넘어와야 하고 user는 회원정보를 내려 받아와야한다.
  const [modifyName, setModifyName] = useState(null);
  // const [modifyId, setModifyId] = useState(null);
  const [modifyPw, setModifyPw] = useState('')
  const [confirm, setConfirm] = useState(false)

  const handleModifyName = (event) => {
    const name = event.target.value;
    setModifyName(name)
  };

  // const handleModifyId = (event) => {
  //   const id = event.target.value;
  //   setModifyId(id);
  // };

  const handelModifyPw = (event) => {
    const pw = event.target.value
    setModifyPw(pw)
  }

  const handleConfirm = (event) => {
    const password = event.target.value
    if(modifyPw === password) setConfirm(true);
    else{
      setConfirm(false)
    }
  }

  const changeUserInfo = () => {
    if(confirm){
      const newUserInfo = {
        name: modifyName === ''? user.name : modifyName,
        pw: modifyPw
      };
      axios({
        url: '54.180.108.24/user',
        method: 'patch',
        data: newUserInfo,
        withCredentials: true
      })
      .then((res)=>{
        console.log('어때?', res.data)
        // 모달창이 닫히고 회원정보창이 보이는 함수 구현, 마이페이지(UserInfo.js에서 구현해서 넘겨준다)
      })
      .catch((err)=>{
        console.log('무슨 에러?', err)
        alert('옳지 않은 정보가 있습니다. 확인 후 시도 해주세요');
      })
    }
  };

  return (
    <div className="modify-info-box">
      <div className="modify-input-box">
        <div className="client-info">
          <p>이름</p>
        </div>
        <input className="input-box" name="text-name" size="30" type="text"
        onChange={handleModifyName}
        ></input>
      </div>
      {/* <div className="modify-input-box">
        <div className="client-info">
          <p>id</p>
        </div>
        <input className="input-box" name="text-name" size="30" type="text"
        onChange={handleModifyId}
        ></input>
      </div> */}
      <div className="modify-input-box">
        <div className="client-info">
          <p>비밀번호</p>
        </div>
        <input className="input-box" name="text-name" size="30" type="text"
        onChange={handelModifyPw}
        ></input>
      </div>
      <div className="modify-input-box">
        <div className="client-info">
          <p>비밀번호 확인</p>
        </div>
        <input className="input-box" name="text-name" size="30" type="text"
        onChange={handleConfirm}
        ></input>
      </div>
      <button className='user-info-modify-bt' onClick={ () => { changeUserInfo(); } }></button>
    </div>
  )
}

export default ModifyUser;