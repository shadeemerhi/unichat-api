const router = require('express').Router();

module.exports = (db) => {

  router.get('/courses', (req, res) => {
    const query = 'SELECT * FROM courses';
    db.query(query).then(data => {
      res.send(data.rows);
    })
  })
  return router;
}