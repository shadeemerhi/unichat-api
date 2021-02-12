const router = require('express').Router();

module.exports = (helpers) => {

  router.get('/courses/rooms', (req, res) => {
    const query = 'SELECT * FROM courseRooms';
    db.query(query).then(data => {
      res.send(data.rows);
    });
  });

  // Will be hit by 'Become a Tutor' components
  router.get('/courses/tutorcourses', (req, res) => {

  })


  return router;
}