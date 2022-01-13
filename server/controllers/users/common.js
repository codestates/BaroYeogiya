const { v4 } = require('uuid');
const { user } = require('../../models');
const { generate, hash } = require('../../utils/token');

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
                // 회원가입 성공
                if (result[1]) {
                    message = 'Success!';
                    data.user_uuid = user_uuid;
                    data.id = id;
                    data.name = name;

                    res.status(201).send({ message, data });
                // 회원가입 실패
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
     * @param { authorization } req.headers
     */
    get: (req, res) => {
        const hashData = hash(req.headers);
        let message = '';
        let data = {};

        // access token 체크
        if (hashData.uuid !== undefined) {
            const { uuid, user_id } = hashData;
            
            user.findOne({
                where: {
                    uuid,
                    user_id
                }
            }).then(result => {
                // 조회 결과가 없음
                if (result === null) {
                    message = 'It\'s a user that doesn\'t exist.';

                    res.status(400).send({ message });
                // 조회 성공
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
     * @param { authorization } req.headers
     * @param { pw, name } req.body
     */
    patch: (req, res) => {
        const hashData = hash(req.headers);
        const { pw, name } = req.body;
        let message = '';
        let data = {};

        // access token 체크
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
                    // 수정 결과가 존재하지 않음
                    if (result[0] === 0) {
                        message = 'It\'s a user that doesn\'t exist.';

                        res.status(400).send({ message });
                    // 수정 완료
                    } else {
                        const tokenData = generate(uuid, user_id);
                        message = 'Success!';
                        data.accessToken = tokenData.accessToken;

                        res.cookie('refresh', tokenData.refreshToken, { maxAge: 86400000 });
                        res.status(200).send({ message, data });
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
     * @param { authorization } req.headers
     */
    delete: (req, res) => {
        const hashData = hash(req.headers);
        let message = '';

        // access token 체크
        if (hashData.uuid !== undefined) {
            const { uuid, user_id } = hashData;

            user.destroy({
                where: {
                    uuid,
                    user_id
                }
            }).then(result => {
                // 삭제 실패
                if (result === 0) {
                    message = 'User does not exist.';

                    res.status(400).send({ message });
                // 삭제 완료
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
    }
}