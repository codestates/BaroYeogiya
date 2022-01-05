require('dotenv').config();
const jwt = require('jsonwebtoken');

module.exports = {
    generate: (uuid, user_id) => {
        const data = { uuid, user_id, created_at: new Date() };
        const accessToken = jwt.sign(data, process.env.ACCESS_SECRET, { expiresIn: '3h' });
        const refreshToken = jwt.sign(data, process.env.REFRESH_SECRET, { expiresIn: '1d' });

        return { accessToken, refreshToken };
    },
    hash: (headers) => {
        try {
            const accessToken = headers.authorization.split('Bearer ')[1];
            const hashData = jwt.verify(accessToken, process.env.ACCESS_SECRET);

            return hashData;
        } catch (err) {
            return null;
        }
    },
    refresh: (cookies) => {
        try {
            const cookieRefreshToken = cookies.refreshToken;
            const hashData = jwt.verify(cookieRefreshToken, process.env.REFRESH_SECRET);
            const data = { uuid: hashData.uuid, user_id: hashData.user_id, created_at: new Date() };
            const accessToken = jwt.sign(data, process.env.ACCESS_SECRET, { expiresIn: '3h' });
            const refreshToken = jwt.sign(data, process.env.REFRESH_SECRET, { expiresIn: '1d' });

            return { accessToken, refreshToken };
        } catch (err) {
            return null;
        }
    }
}