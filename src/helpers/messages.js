const { createPrivateRoomMsg, getPrivateRoomMsg } = require("./privateRoom");

module.exports = (db) => {

  const createMessage = (course_id, sender_id, body) => {
    if(course_id.length > 5) {
      return createPrivateRoomMsg(course_id, sender_id, body, db);
    } else {
      const queryParams = [
        course_id,
        sender_id,
        body
      ];

      const query =
        `
        INSERT INTO courseRoomsMessages (course_id, sender_id, body)
        VALUES ($1, $2, $3)
        RETURNING id, course_id, sender_id, body, is_edited, 
        TRIM(LEADING '0' FROM to_char(created_at, 'HH12:MI AM')) as created_at;`;

      return db.query(query, queryParams).catch((e) => console.log('failed to create msg ', e))
    }
  }

  const getMessagesInRoom = async (room_id) => {
    if(room_id.length > 5) {
      return getPrivateRoomMsg(room_id, db)
    } else {
      const queryParams = [
        room_id
      ];

      const query =
      `
      SELECT courseRoomsMessages.id, course_id, sender_id, body, "firstName", 
      "lastName", is_edited, TRIM(LEADING '0' FROM to_char(created_at, 'HH12:MI AM')) as created_at 
      FROM courseRoomsMessages
      JOIN users ON sender_id = users.id
      WHERE course_id = $1
      ORDER BY id;
      `;

      return db
        .query(query, queryParams)
        .then(res => res.rows)
        .catch(error => console.log(error));
    }

  }

  const editMessage = (id, newBody) => {

    const queryParams = [
      newBody,
      id
    ];

    const query =
    `
    UPDATE courseRoomsMessages
    SET 
    body = $1,
    is_edited = 'true'
    WHERE id = $2;
    `;

    return db.query(query, queryParams);

  }

  return { createMessage, getMessagesInRoom, editMessage };
}
