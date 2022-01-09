const { Op } = require('sequelize');
const { store, user_store } = require('../../models');
const { hash } = require('../../utils/token');

/**
 * @path /map/pin
 */
module.exports = {
    /**
     * 핀 조회 API
     * @method GET
     * @param { authorization } req.headers
     * @param { start_latitude, end_latitude, start_longitude, end_longitude, like } req.body
     */
    get: (req, res) => {
        const hashData = hash(req.headers);
        const { start_latitude, end_latitude, start_longitude, end_longitude, like } = req.body;
        let message = '';
        let data = [];

        // access token 확인
        if (like === undefined || (like !== undefined && hashData.uuid !== undefined)) {
            // parameter 유무 확인
            if (start_latitude === undefined || end_latitude === undefined || start_longitude === undefined || end_longitude === undefined) {
                message = 'Check your parameter.';
    
                res.status(400).send({ message });
            } else {
                const { uuid, user_id } = hashData;
                let include;

                // like parameter가 true일 때만 테이블 조인
                if (like) {
                    console.log("weewrtewfwefg");
                    include = [
                        {
                            model: user_store,
                            attributes: [],
                            where: {
                                user_uuid: uuid
                            }
                        }
                    ]
                }

                // 매장 정보 검색
                store.findAll({
                    include,
                    where: {
                        latitude: {
                            [Op.between]: [start_latitude, end_latitude]
                        },
                        longitude: {
                            [Op.between]: [start_longitude, end_longitude]
                        }
                    },
                    attributes: [
                        'latitude',
                        'longitude'
                    ]
                }).then(result => {
                    const dataValues = result.map(el => el.dataValues);

                    message = 'Success!';
                    data = dataValues;

                    res.status(200).send({ message, data });
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