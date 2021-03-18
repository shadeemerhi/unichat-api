const createPrivateRoom = (db) => async (req, res) => {
    const query = `INSERT INTO privateRooms (name, author_id) VALUES ($1, $2) RETURNING *`;

    if(req.body) {
        const {name: roomName, userId: authorId } = req.body;

        const queryParams = [roomName, authorId];

        try {
           const {rows} = await db.query(query, queryParams);
           res.json({msg: 'room created', room: rows});
        } catch (e) {
            res.status(500).json({msg: 'Something went wrong on private room creation'})
        }

    } else {
        res.status(500).json({msg: 'Something went wrong on private room creation'})
    }
}


module.exports = { createPrivateRoom }
