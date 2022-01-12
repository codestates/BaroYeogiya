const { user_store } = require('../../models');
const { hash } = require('../../utils/token');

/**
 * @path /store/:uuid
 */
module.exports = {
    /**
     * 매장 찜하기 API
     * @param { authorization } req.headers
     * @param { uuid } req.params
     */
    post: (req, res) => {
        const hashData = hash(req.headers);
        const { uuid: store_uuid } = req.params;
        let message = '';

        // access token 검사
        if (hashData.uuid !== undefined) {
            const { uuid: user_uuid } = hashData;

            // 매장 찜하기
            user_store.findOrCreate({
                where: {
                    user_uuid,
                    store_uuid
                }
            }).then(result => {
                if (result[1]) {
                    message = 'Success!';

                    res.status(201).send({ message });
                } else {
                    message = 'This is a review that has been registered.';

                    res.status(200).send({ message });
                }
            }).catch(err => {
                message = 'Review does not exist.';

                res.status(200).send({ message });
            })
        // 액세스 토큰 만료 처리
        } else if (hashData) {
            message = 'The access token has expired.';

            res.status(401).send({ message });
        // 액세스 토큰이 잘못됨
        } else {
            message = 'Check your access token.';

            res.status(401).send({ message });
        }
    },
    put: (req, res) => {
    },
    delete: (req, res) => {
    }
}