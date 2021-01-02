const router = require('express').Router();

module.exports = (db) => {

  router.get('/programs', (req, res) => {
    const query = 'SELECT name FROM programs';
    db.query(query).then(data => {
      console.log(data.rows);
    })
  })
  return router;
}