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
      VALUES ($1, $2, $3);
      `;

    return db.query(query, queryParams);
  }

  const getMessagesInRoom = (room_id) => {

    const queryParams = [
      room_id
    ];

    const query = 
    `
    SELECT course_id, sender_id, body, "firstName", "lastName", is_edited
    FROM coursesMessages
    JOIN users ON sender_id = users.id
    WHERE course_id = $1;
    `;

    return db
      .query(query, queryParams)
      .then(res => res.rows)
      .catch(error => console.log(error));

  }

  return { createMessage, getMessagesInRoom };
}