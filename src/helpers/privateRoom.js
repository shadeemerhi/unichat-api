const getPrivateRoomId = async (id, db) => {
    let roomID = null;
    const query = 'SELECT id FROM privaterooms WHERE room_id = $1';
    try {
        const { rows } = await db.query(query, [id]);
        roomID = rows[0].id
    } catch (e) {
        console.log('failed to get private room id')
    }
    return roomID
}

const createPrivateRoomMsg = async (roomId, senderId, body, db) => {
    const roomID = await getPrivateRoomId(roomId, db);

     const query =
         `
      INSERT INTO privateRoomMessages (room_id, sender_id, body)
      VALUES ($1, $2, $3)
      RETURNING id, room_id, sender_id, body, is_edited, 
      TRIM(LEADING '0' FROM to_char(created_at, 'HH12:MI AM')) as created_at;`;

     const queryParams = [roomID, senderId, body]

        try {
            const data = await db.query(query, queryParams);
            return data;
        } catch (e) {
            console.log('failed to create private room msg', e);
        }
    }

const getPrivateRoomMsg = async (roomId , db) => {
    const roomID = await getPrivateRoomId(roomId, db);

    const query =
        `
      SELECT privateRoomMessages.id, room_id, sender_id, body, "firstName", 
      "lastName", is_edited, TRIM(LEADING '0' FROM to_char(created_at, 'HH12:MI AM')) as created_at 
      FROM privateRoomMessages
      JOIN users ON sender_id = users.id
      WHERE room_id = $1
      ORDER BY id;
      `;
    try {
        const { rows } = await db.query(query, [roomID]);
        console.log('dd', rows);
        return rows;
    } catch (e) {
        console.log('failed to fetch private room msg', e);
    }

}
module.exports = { createPrivateRoomMsg, getPrivateRoomMsg };
