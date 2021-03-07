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
    console.log('we are hitting tutorcourses');
    helpers
      .getTutorCourses()
      .then(data => res.send(data))
      .catch(error => {
        res.status(500).send({ error })
      });
  });

  // Testing calling the API on button click; this will be removed
  router.get('/courses/testendpoint', (req, res) => {
    console.log('endpoint being hit');
    res.send('from the server');
  });


  return router;
}