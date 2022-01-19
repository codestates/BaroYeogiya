import * as React from 'react';
// import { useEffect } from 'react';
// import axios from 'axios';

function CartList({ userInfo }) {
  // const token = userInfo.accessToken.data.accessToken;

  // useEffect(()=>{
  //   axios({
  //     url: `${process.env.REACT_APP_SERVER_URL}/store/my-list`,
  //     method: 'GET',
  //     headers: {
  //       Authorization: `Bearer ${token}`
  //     },
  //     withCredentials: true
  //   })
  //   .then((res)=>{
  //     console.log('잘 들어 오니?', res)
  //   })
  //   .catch((error)=>{
  //     console.log(error);
  //   });
  // }, [])
  console.log(userInfo);
  return <>찜목록 페이지!</>;
}

export default CartList;
