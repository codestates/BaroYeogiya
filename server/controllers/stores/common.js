const { v4 } = require('uuid');
const { store } = require('../../models');
const { hash } = require('../../utils/token');

/**
 * @path /store
 */
module.exports = {
    /**
     * 매장 조회 API
     * @method GET
     * @param { latitude, longitude, offset, limit } req.query
     */
    get: (req, res) => {
        const { latitude, longitude } = req.query;
        let { offset, limit } = req.query;
        let message = '';
        let data;

        // parameter 유무 확인
        if (latitude === undefined || longitude === undefined) {
            message = 'Check your parameter.';
    
            res.status(400).send({ message });
        // 매장 목록 조회
        } else {
            if (isNaN(offset)) offset = 0;
            else offset = Number(offset);
            if (isNaN(limit)) limit = 10;
            else limit = Number(limit);
            
            store.findAll({
                where: {
                    latitude,
                    longitude
                },
                attributes: [
                    ['uuid', 'store_uuid'],
                    'address',
                    'image'
                ],
                offset: offset * limit,
                limit
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
     * @param { address, latitude, longitude, image } req.body
     */
    post: (req, res) => {
        const hashData = hash(req.headers);
        const { address, latitude, longitude, image } = req.body;
        let message = '';
        let data = {};

        // access token 조회
        if (hashData.uuid !== undefined) {
            // parameter 유무 확인
            if (address === undefined || latitude === undefined || longitude === undefined) {
                message = 'Check your parameter.';
    
                res.status(400).send({ message });
            // 매장 등록
            } else {
                store.create({
                    uuid: v4(),
                    address,
                    latitude,
                    longitude,
                    image
                }).then(result => {
                    if (result.dataValues !== null) {
                        message = 'Success!';
                        data.store_uuid = result.dataValues.uuid;
                        data.address = result.dataValues.address;

                        if (result.dataValues.image === undefined) {
                            data.image = null;
                        } else {
                            data.image = result.dataValues.image;
                        }
                        
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
    },
    /**
     * 매장 이미지 수정 API
     * @param { authorization } req.headers
     * @param { store_uuid, image } req.body
     */
    put: (req, res) => {
        const hashData = hash(req.headers);
        const { store_uuid, image } = req.body;
        let message = '';

        // access token 검사
        if (hashData.uuid !== undefined) {
            //매장 이미지 수정
            store.update({
                image
            }, {
                where: {
                    uuid: store_uuid
                }
            }).then(result => {
                if (result[0] === 0) {
                    message = 'Store that does not exist or has already been changed.';

                    res.status(400).send({ message });
                } else {
                    message = 'Success!';

                    res.status(200).send({ message });
                }
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
}