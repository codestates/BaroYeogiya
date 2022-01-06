require('dotenv').config();
const jwt = require('jsonwebtoken');

module.exports = {
    /**
     * access token 및 refresh token 생성
     * access token 및 refresh token이 담긴 객체를 반환
     * @param uuid 
     * @param user_id 
     * @returns { accessToken, refreshToken }
     */
    generate: (uuid, user_id) => {
        const data = { uuid, user_id, created_at: new Date() };
        const accessToken = jwt.sign(data, process.env.ACCESS_SECRET, { expiresIn: '3h' });
        const refreshToken = jwt.sign(data, process.env.REFRESH_SECRET, { expiresIn: '1d' });

        return { accessToken, refreshToken };
    },
    /**
     * access token 해싱
     * access token 해싱이 완료되면 Object를 반환
     * access token이 만료되었다면 true를 반환
     * access token이 잘못되었다면 false를 반환
     * @param { authorization } headers 
     * @returns Object || Boolean
     */
    hash: (headers) => {
        try {
            const accessToken = headers.authorization.split('Bearer ')[1];
            const hashData = jwt.verify(accessToken, process.env.ACCESS_SECRET);

            return hashData;
        } catch (err) {
            if (err.name === 'TokenExpiredError') {
                return true;
            } else {
                return false;
            }
        }
    },
    /**
     * access token 및 refresh token 재발급
     * access token 및 refresh token 재발급이 완료되었다면 Object를 반환
     * refresh token이 만료되었다면 true를 반환
     * refresh token이 잘못되었다면 false를 반환
     * @param { refreshToken } cookies 
     * @returns Object || Boolean
     */
    refresh: (cookies) => {
        try {
            const cookieRefreshToken = cookies.refreshToken;
            const hashData = jwt.verify(cookieRefreshToken, process.env.REFRESH_SECRET);
            const data = { uuid: hashData.uuid, user_id: hashData.user_id, created_at: new Date() };
            const accessToken = jwt.sign(data, process.env.ACCESS_SECRET, { expiresIn: '3h' });
            const refreshToken = jwt.sign(data, process.env.REFRESH_SECRET, { expiresIn: '1d' });

            return { accessToken, refreshToken };
        } catch (err) {
            if (err.name === 'TokenExpiredError') {
                return true;
            } else {
                return false;
            }
        }
    }
}