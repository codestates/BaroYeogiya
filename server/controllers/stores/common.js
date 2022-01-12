const { store } = require('../../models');

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
    post: (req, res) => {

    }
}