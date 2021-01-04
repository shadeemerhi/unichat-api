const router = require('express').Router();

module.exports = (db) => {

  router.get('/users/:email', (req, res) => {
    const email = req.params;
    console.log('email at endpoint', email);
    const queryParams = [
      email
    ];

    const query = `SELECT * FROM users WHERE email = $1`;
    db.query(query, queryParams).then(data => {
      res.send(data.rows);
    })
  })

  router.post('/users', (req, res) => {

    const { uid, email } = req.body.user;
    const { program } = req.body;
    const queryParams = [
      uid,
      email,
      program
    ];

    console.log('user stuff', queryParams);

    const query = 
    `INSERT INTO users (uid, email, program) 
    VALUES
    ($1, $2, $3)`;

    return db.query(query, queryParams).then((data) => {
      console.log('hi there');
      res.send('after database')
    })
    .catch(error => {
      res.status(400).send({ error })
    })


  })

  return router;
}