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
     * @param { latitude, longitude, like } req.query
     */
    get: (req, res) => {
        const hashData = hash(req.headers);
        let { latitude, longitude, like } = req.query;
        let message = '';
        let data = [];

        latitude = Number(latitude);
        longitude = Number(longitude);
        like === 'true' ? like = true : like = false;

        // access token 확인
        if (like === false || (like === true && hashData.uuid !== undefined)) {
            // parameter 유무 확인
            if (isNaN(latitude) || isNaN(longitude)) {
                message = 'Check your parameter.';
    
                res.status(400).send({ message });
            } else {
                const { uuid } = hashData;
                let include;

                // like parameter가 true일 때만 테이블 조인
                if (like) {
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
                            [Op.between]: [latitude - 0.5, latitude + 0.5]
                        },
                        longitude: {
                            [Op.between]: [longitude - 0.5, longitude + 0.5]
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