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

  return { createMessage };
}