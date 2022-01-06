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
            })
        }
    },
    get: (req, res) => {
    },
    patch: (req, res) => {
    },
    delete: (req, res) => {
    }
}