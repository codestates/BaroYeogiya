const sequelize = require('sequelize');
const { review } = require('../../models');
const { hash } = require('../../utils/token');

/**
 * @path /review/:uuid
 */
module.exports = {
    /**
     * 리뷰 상세 조회 API
     * @method GET
     * @param { uuid } req.params
     */
    get: (req, res) => {
        const { uuid: review_uuid } = req.params;
        let message = '';
        let data = {};

        // 리뷰 검색
        review.findOne({
            where: {
                uuid: review_uuid
            },
            attributes: [
                ['uuid', 'review_uuid'],
                'user_uuid',
                'store_uuid',
                'content',
                'image',
                'created_at'
            ]
        }).then(result => {
            // 리뷰가 존재하지 않음
            if (result === null) {
                message = 'Review does not exist.';

                res.status(400).send({ message });
            // 리뷰 조회 완료
            } else {
                message = 'Success!';
                data = result.dataValues;
    
                res.status(200).send({ message, data });
            }
        })
    },
    delete: (req, res) => {
    }
}