const { store, user_store } = require('../../models');
const { hash } = require('../../utils/token');

/**
 * @path /store/my-list
 */
module.exports = {
    /**
     * 찜한 매장 조회 API
     * @method GET
     * @param { authorization } req.headers
     * @param { offset, limit } req.query
     */
    get: (req, res) => {
        const hashData = hash(req.headers);
        let { offset, limit } = req.query;
        let message = '';
        let data;

        // access token 확인
        if (hashData.uuid !== undefined) {
            const { uuid } = hashData;

            if (isNaN(offset)) offset = 0;
            else offset = Number(offset);
            if (isNaN(limit)) limit = 10;
            else limit = Number(limit);
            
            // 찜한 매장 조회
            store.findAll({
                include: [
                    {
                        model: user_store,
                        attributes: [],
                        where: {
                            user_uuid: uuid
                        }
                    }
                ],
                attributes: [
                    ['uuid', 'store_uuid'],
                    'address',
                    'latitude',
                    'longitude',
                    'image'
                ],
                offset: offset * limit,
                limit
            }).then(result => {
                message = 'Success!';
                data = result.map(el => el.dataValues);
                res.status(200).send({ message, data });
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
    }
}