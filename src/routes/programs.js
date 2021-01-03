const router = require('express').Router();

module.exports = (db) => {

  router.get('/programs', (req, res) => {
    const query = 'SELECT * FROM programs';
    db.query(query).then(data => {
      res.send(data.rows);
      console.log(data.rows);
    })
  })
  return router;
}