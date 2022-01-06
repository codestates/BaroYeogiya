const { v4 } = require('uuid');
const { user } = require('../../models');
const { generate, hash, refresh } = require('../../utils/token');

/**
 * @path /user/refresh
 */
module.exports = {
    /**
     * 액세스 토큰 갱신 API
     * @param { refreshToken } req.cookies
     */
    get: (req, res) => {
        const refreshData = refresh(req.cookies);
        let message = '';
        let data = {};

        console.log(req.cookies);
        if (refreshData.accessToken !== undefined) {
            message = 'Success!';
            data = refreshData;
            
            res.status(200).send({ message, data });
        } else if (refreshData) {
            message = 'The refresh token has expired.';

            res.status(400).send({ message });
        } else {
            message = 'Check your refresh token.';

            res.status(400).send({ message });
        }
    }
}