import * as React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import SectionCard from './SectionCard'
import '../Css/CartList.css';

function CartList({ userInfo }) {
  
  const [myList, setMylist] = useState([]);
  // 현재 페이지
  const [page, setPage] = useState(1);
  const token = userInfo.accessToken.data.accessToken;

  const searchMyStore = async (offset = 0) => {
    await axios({
      url: `${process.env.REACT_APP_SERVER_URL}/store/my-list`,
      method: 'GET',
      params: {
        offset
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    })
    .then((res) => {
      if (res.status === 200) {
        const getStore = res.data.data;
        // state에 담길 매장 리스트
        const storeList = [];

        for (let i = 0; i < getStore.length; i++) {
          let store = getStore[i];

          store.num = i;
          storeList.push(store);
        }
        setMylist(storeList);
      } else if (res.status === 400) {
        alert('존재하지 않는 유저입니다.');
      } else if (res.status === 401) {
        alert('액세스 토큰이 만료되었습니다.');
      }
    })
    .catch((err) => {
      console.log(err);
    });
  }

  // 페이징
  const pagingMyStore = async (setNum) => {
    let pageNum = page;
    if (setNum < 0 && pageNum > 1) {
      pageNum--;
    } else if (setNum > 0) {
      pageNum++;
    }
    await setPage(pageNum);
    searchMyStore(pageNum - 1);
  }

    // 찜한 매장 조회
  useEffect(() => {
    searchMyStore();
  },[]);

  return (
    <>
      <div className="cart-list-title">
        <p>위치</p>
        <p>이름</p>
      </div>
      {myList.map((like) => 
        <SectionCard like={like} userInfo={userInfo} searchMyStore={searchMyStore} />)
      }
      <div className="cart-list-page">
        <p onClick={() => {pagingMyStore(-1);}}>이전페이지</p>
        <p>{page}</p>
        <p onClick={() => {pagingMyStore(1);}}>다음페이지</p>
      </div>
    </>
  );
}

export default CartList;
