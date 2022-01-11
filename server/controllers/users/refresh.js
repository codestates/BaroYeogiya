const { refresh } = require('../../utils/token');

/**
 * @path /user/refresh
 */
module.exports = {
    /**
     * 액세스 토큰 갱신 API
     * @param { refreshToken } req.cookies
     */
    get: (req, res) => {
        const tokenData = refresh(req.cookies);
        let message = '';
        let data = {};

        console.log(tokenData.accessToken);
        if (tokenData.accessToken !== undefined) {
            message = 'Success!';
            data.accessToken = tokenData.accessToken;
            
            res.cookie('refresh', tokenData.refreshToken, { maxAge: 86400000 });
            res.status(200).send({ message, data });
        } else if (tokenData) {
            message = 'The refresh token has expired.';

            res.status(400).send({ message });
        } else {
            message = 'Check your refresh token.';

            res.status(400).send({ message });
        }
    }
}