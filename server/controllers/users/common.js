const { v4 } = require('uuid');
const { user } = require('../../models');
const { generate, hash, refresh } = require('../../utils/token');

/**
 * @path /user
 */
module.exports = {
    /**
     * 회원가입 API
     * @method POST
     * @param { id, pw, name } req.body
     */
    post: (req, res) => {
        const { id, pw, name } = req.body;
        let message = '';
        let data = {};

        // parameter 유무 확인
        if (id === undefined || pw === undefined || name === undefined) {
            message = 'Check your parameter.';
            
            res.status(400).send({ message });
        // 회원가입 처리
        } else {
            const user_uuid = v4();
            user.findOrCreate({
                where: {
                    user_id: id
                },
                defaults: {
                    uuid: user_uuid,
                    pw,
                    name,
                    created_at: new Date()
                },
            }).then(result => {
                if (result[1]) {
                    message = 'Success!';
                    data.user_uuid = user_uuid;
                    data.id = id;
                    data.name = name;

                    res.status(201).send({ message, data });
                } else {
                    message = 'Check your id.';

                    res.status(200).send({ message });
                }
            });
        }
    },
    /**
     * 회원정보 조회 API
     * @method GET
     * @param { authorization } req.header
     */
    get: (req, res) => {
        const hashData = hash(req.headers);
        let message = '';
        let data = {};

        // 회원정보 조회
        if (hashData.uuid !== undefined) {
            const { uuid, user_id } = hashData;
            
            user.findOne({
                where: {
                    uuid,
                    user_id
                }
            }).then(result => {
                if (result === null) {
                    message = 'It\'s a user that doesn\'t exist.';

                    res.status(400).send({ message });
                } else {
                    message = 'Success!';
                    data.user_uuid = uuid;
                    data.id = user_id;
                    data.name = result.name;

                    res.status(200).send({ message, data });
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
    },
    /**
     * 회원정보 수정 API
     * @method PATCH
     * @param { authorization } req.header
     * @param { pw, name } req.body
     */
    patch: (req, res) => {
        const hashData = hash(req.headers);
        const { pw, name } = req.body;
        let message = '';
        let data = {};

        // 회원정보 조회
        if (hashData.uuid !== undefined) {
            // parameter 유무 확인
            if (pw === undefined || name === undefined) {
                message = 'Check your parameter.';

                res.status(400).send({ message });
            } else {
                const { uuid, user_id } = hashData;

                user.update({
                    pw,
                    name
                }, {
                    where: {
                        uuid,
                        user_id
                    }
                }).then(result => {
                    if (result[1] === 0) {
                        message = 'It\'s a user that doesn\'t exist.';

                        res.status(400).send({ message });
                    } else {
                        message = 'Success!';
                        data = generate(uuid, user_id);

                        res.status(400).send({ message, data });
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
     * 회원정보 삭제 API
     * @param { authorization } req.header
     */
    delete: (req, res) => {
        const hashData = hash(req.headers);
        let message = '';

        // 회원정보 조회
        if (hashData.uuid !== undefined) {
            const { uuid, user_id } = hashData;

            user.destroy({
                where: {
                    uuid,
                    user_id
                }
            }).then(result => {
                if (result === 0) {
                    message = 'User does not exist.';

                    res.status(401).send({ message });
                } else {
                    message = 'Success!';

                    res.status(401).send({ message });
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
    }
}