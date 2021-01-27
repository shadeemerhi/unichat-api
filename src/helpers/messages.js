module.exports = (db) => {

  const createMessage = (course_id, sender_id, body) => {

    console.log('message details', course_id, sender_id, body);
  }

  return { createMessage };
}