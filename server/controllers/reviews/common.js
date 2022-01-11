const { v4 } = require('uuid');
const { review } = require('../../models');
const { hash } = require('../../utils/token');

/**
 * @path /review
 */
module.exports = {
    /**
     * 리뷰 등록 API
     * @method POST
     * @param { authorization } req.headers
     * @param { store_uuid, content, image } req.body
     */
    post: (req, res) => {
        const hashData = hash(req.headers);
        const { store_uuid, content, image } = req.body;
        let message = '';
        let data = {};

        // access token 조회
        if (hashData.uuid !== undefined) {
            // parameter 유무 확인
            if (store_uuid === undefined || content === undefined) {
                message = 'Check your parameter.';
    
                res.status(400).send({ message });
            // 리뷰 등록
            } else {
                const { uuid: user_uuid } = hashData;

                review.create({
                    uuid: v4(),
                    user_uuid,
                    store_uuid,
                    content,
                    image,
                    created_at: new Date()
                }, {
                    attributes: [
                        ['uuid', 'review_uuid'],
                        'store_uuid',
                        'content',
                        'image'
                    ]
                }).then(result => {
                    if (result.dataValues !== null) {
                        message = 'Success!';
                        data = result.dataValues;
                        
                        res.status(201).send({ message, data });
                    } else {
                        message = 'Check your parameter.';
            
                        res.status(400).send({ message });
                    }
                }).catch(err => {
                    message = 'Store does not exist.';

                    res.status(400).send({ message });
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
     * 리뷰 목록 조회 API
     * @method GET
     * @param { store_uuid, offset, limit } req.query 
     */
    get: (req, res) => {
        const hashData = hash(req.headers);
        const { store_uuid } = req.query;
        let { offset, limit } = req.query;
        let message = '';
        let data;

        // parameter 유무 확인
        if (store_uuid === undefined) {
            message = 'Check your parameter.';

            res.status(400).send({ message });
        // 리뷰 목록 조회
        } else {
            if (isNaN(offset)) offset = 0;
            else offset = Number(offset);
            if (isNaN(limit)) limit = 10;
            else limit = Number(limit);

            review.findAll({
                where: {
                    store_uuid
                }, 
                offset: offset * limit,
                limit
            }).then(result => {
                message = 'Success!';
                data = result.map(el => el.dataValues);
                res.status(200).send({ message, data });
            })
        }
    },
    patch: (req, res) => {
    }
}