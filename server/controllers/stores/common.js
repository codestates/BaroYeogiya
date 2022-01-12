const { v4 } = require('uuid');
const { store } = require('../../models');
const { hash } = require('../../utils/token');

module.exports = {
    /**
     * 매장 조회 API
     * @method GET
     * @param { latitude, longitude } req.query
     */
    get: (req, res) => {
        const { latitude, longitude } = req.query;
        let message = '';
        let data;

        // parameter 유무 확인
        if (latitude === undefined || longitude === undefined) {
            message = 'Check your parameter.';
    
            res.status(400).send({ message });
        } else {
            store.findAll({
                where: {
                    latitude,
                    longitude
                },
                attributes: [
                    ['uuid', 'store_uuid'],
                    'address',
                    'image'
                ]
            }).then(result => {
                message = 'Success!';
                data = result.map(el => el.dataValues);
                res.status(200).send({ message, data });
            })
        }
    },
    /**
     * 매장 등록 API
     * @method POST
     * @param { authorization } req.headers
     * @param { name, latitude, longitude, image } req.body
     */
    post: (req, res) => {
        const hashData = hash(req.headers);
        const { name, latitude, longitude, image } = req.body;
        let message = '';
        let data = {};

        // access token 조회
        if (hashData.uuid !== undefined) {
            // parameter 유무 확인
            if (name === undefined || latitude === undefined || longitude === undefined) {
                message = 'Check your parameter.';
    
                res.status(400).send({ message });
            // 매장 등록
            } else {
                store.create({
                    uuid: v4(),
                    address: name,
                    latitude,
                    longitude,
                    image
                }).then(result => {
                    if (result.dataValues !== null) {
                        message = 'Success!';
                        data.store_uuid = result.dataValues.uuid;
                        data.name = result.dataValues.address;
                        data.image = result.dataValues.image;
                        
                        res.status(201).send({ message, data });
                    } else {
                        message = 'Check your parameter.';
            
                        res.status(400).send({ message });
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