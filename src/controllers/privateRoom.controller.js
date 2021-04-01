const { v4: uuid } = require('uuid');

const createPrivateRoom = db => async (req, res) => {
    const query = `INSERT INTO privaterooms (name, author_id, room_id) VALUES ($1, $2, $3) RETURNING *`;

    if(req.body) {
        const {name: roomName, userId: authorId } = req.body;

        const id = uuid();

        const queryParams = [roomName, authorId, id];

        try {
           const { rows } = await db.query(query, queryParams);
           res.json({msg: 'room created', room: rows});
        } catch (e) {
            res.status(500).json({msg: 'Something went wrong on private room creation', err: e})
        }

    } else {
        res.status(500).json({msg: 'Something went wrong body not exist'})
    }
}

const getPrivateRooms = db => async (req, res) => {
    const query = `SELECT * FROM privaterooms WHERE author_id=$1`;
    if(req.params) {
        const { authorId } = req.params;

        const queryParams = [authorId];

        try {
            const { rows } = await db.query(query, queryParams);
            res.json({ privateRooms: rows});
        } catch (e) {
            res.status(500).json({msg: 'Failed to load private rooms', err: e});
        }
    } else {
        res.status(500).json({msg: 'Failed to load private rooms'});
    }

}


module.exports = { createPrivateRoom, getPrivateRooms }
