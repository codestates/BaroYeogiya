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
    /**
     * 리뷰 삭제 API
     * @method POST
     * @param { authorization } req.headers
     * @param { uuid } req.params
     */
    delete: (req, res) => {
        const hashData = hash(req.headers);
        const { uuid: review_uuid } = req.params;
        let message = '';
        let data = {};

        // access token 검사
        if (hashData.uuid !== undefined) {
            const { uuid, user_id } = hashData;
            
            // 리뷰 검색
            review.findOne({
                where: {
                    uuid: review_uuid
                }
            }).then(result => {
                // 리뷰가 존재하지 않을 경우
                if (result === null) {
                    message = 'Review does not exist.';

                    res.status(400).send({ message });
                } else {
                    // 작성자일 경우
                    if (result.dataValues.user_uuid === uuid) {
                        review.destroy({
                            where: {
                                uuid: review_uuid
                            }
                        }).then(result => {
                            if (result === 0) {
                                message = 'Review does not exist.';
            
                                res.status(400).send({ message });
                            } else {
                                message = 'Success!';
            
                                res.status(200).send({ message });
                            }
                        })
                    // 작성자가 아닐 경우
                    } else {
                        message = 'You don\'t have permission.';
    
                        res.status(200).send({ message });
                    }
                }
            });
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