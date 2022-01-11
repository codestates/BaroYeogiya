const { user } = require('../../models');
const { hash } = require('../../utils/token');

/**
 * @path /user/pw-confirm
 */
 module.exports = {
    /**
     * 비밀번호 확인 API
     * @method GET
     * @param { authorization } req.headers
     * @param { pw } req.query
     */
    get: (req, res) => {
        const hashData = hash(req.headers);
        const { pw } = req.query;
        let message = '';
        let data = {};

        // 회원정보 조회
        if (hashData.uuid !== undefined) {
            // parameter 유무 확인
            if (pw === undefined) {
                message = 'Check your parameter.';

                res.status(400).send({ message });
            } else {
                const { uuid, user_id } = hashData;

                user.findOne({
                    where: {
                        uuid,
                        user_id,
                        pw
                    }
                }).then(result => {
                    // 아이디 혹은 비밀번호가 일치하지 않음
                    if (result === null) {
                        message = 'Does not match password.';
    
                        res.status(400).send({ message });
                    // access token과 refresh token 생성
                    } else {
                        message = 'Success!';

                        res.status(200).send({ message });
                    }
                })
            }
        // 액세스 토큰 만료 처리
        } else if (hashData) {
            message = 'The access token has expired.';

            res.status(401).send({ message });
        // 액세스 토큰이 잘못됨
        } else {
            message = 'Check your access token.';

            res.status(401).send({ message });
        }
    }
}