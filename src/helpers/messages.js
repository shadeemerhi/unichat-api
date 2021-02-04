module.exports = (db) => {

  const createMessage = (course_id, sender_id, body) => {

    const queryParams = [
      course_id,
      sender_id,
      body
    ];

    const query = 
      `
      INSERT INTO coursesMessages (course_id, sender_id, body)
      VALUES ($1, $2, $3)
      RETURNING *`;

    return db.query(query, queryParams);
  }

  const getMessagesInRoom = (room_id) => {

    const queryParams = [
      room_id
    ];

    const query = 
    `
    SELECT coursesMessages.id, course_id, sender_id, body, "firstName", 
    "lastName", is_edited, to_char(created_at, 'HH12:MI AM') as created_at 
    FROM coursesMessages
    JOIN users ON sender_id = users.id
    WHERE course_id = $1
    ORDER BY id;
    `;

    return db
      .query(query, queryParams)
      .then(res => res.rows)
      .catch(error => console.log(error));

  }

  const editMessage = (id, newBody) => {

    const queryParams = [
      newBody,
      id
    ];

    const query = 
    `
    UPDATE coursesMessages
    SET 
    body = $1,
    is_edited = 'true'
    WHERE id = $2;
    `;

    return db.query(query, queryParams);

  }

  return { createMessage, getMessagesInRoom, editMessage };
}