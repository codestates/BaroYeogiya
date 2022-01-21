import * as React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import SectionCard from './SectionCard'

function CartList({ userInfo }) {
  
  const [myList, setMylist] = useState([]);
  const token = userInfo.accessToken.data.accessToken;

    // 찜한 매장 조회
  useEffect( async ()=>{
    await axios({
      url: `${process.env.REACT_APP_SERVER_URL}/store/my-list`,
      method: 'GET',
      params: {
        // offset :
        // limit :
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    })
      .then((res) => {
        if (res.status === 200) {
          const getStore = res.data.data;

          for (let i = 0; i < getStore.length; i++) {
            const likeMyStore = getStore[i];
            console.log('likeMyStore', likeMyStore);
            setMylist((current) => [...current, likeMyStore]);
          }
        } else if (res.status === 400) {
          alert('존재하지 않는 유저입니다.');
        } else if (res.status === 401) {
          alert('액세스 토큰이 만료되었습니다.');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },[]);

  

  return (
    <>
      {myList.map((like) => 
        <SectionCard like={like} userInfo={userInfo} />)
      }
    </>
  );
}

export default CartList;
