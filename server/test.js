const { v4 } = require('uuid');
const { token } = require('./utils');


// accessToken, refreshToken 테스트
const tokenTest = () => {
    const uuid = v4();
    const user_id = 'test_id';

    // 토큰 생성 테스트
    const tokenData = token.generate(uuid, user_id);

    if (tokenData !== null) {
        console.log("토큰 생성 테스트 - 성공");
    } else {
        console.log("토큰 생성 테스트 - 실패");
    }

    // 토큰 생성 테스트
    const hashData = token.hash({ authorization: 'Bearer ' + tokenData.accessToken });

    if (tokenData !== null) {
        console.log("토큰 해싱 테스트 - 성공");
    } else {
        console.log("토큰 해싱 테스트 - 실패");
    }

    const refreshData = token.refresh({ refreshToken: 'tokenData.refreshToken'});

    if (tokenData !== null) {
        console.log("토큰 재발급 테스트 - 성공");
    } else {
        console.log("토큰 재발급 테스트 - 실패");
    }
}

tokenTest();