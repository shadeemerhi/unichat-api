const router = require('express').Router();

module.exports = (helpers) => {

  router.get('/courses/rooms', (req, res) => {
    helpers
      .getCourseRooms()
      .then(data => res.send(data))
      .catch(error => {
        res.status(500).send({ error })
      });
  });

  // Will be hit by 'Become a Tutor' components
  router.get('/courses/tutorcourses', (req, res) => {
    helpers
      .getTutorCourses()
      .then(data => res.send(data))
      .catch(error => {
        res.status(500).send({ error })
      });
  })


  return router;
}