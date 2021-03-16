const router = require('express').Router();
const {createPrivateRoom} = require('../controllers/privateRoom.controller')

module.exports = (db) => {
    router
        .route('/privateroom')
        .post(createPrivateRoom(db));

    return router;
}
