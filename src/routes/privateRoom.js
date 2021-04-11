const router = require('express').Router();
const { createPrivateRoom, getPrivateRooms } = require('../controllers/privateRoom.controller')

module.exports = (db) => {
    router
        .route('/privateroom')
        .post(createPrivateRoom(db));

    router
        .route('/privateroom/:authorId')
        .get(getPrivateRooms(db));

    return router;
}
