const router = require('express').Router();

module.exports = (db) => {

  router.get('/users/:id', (req, res) => {
    const uid = req.params.id;
    const queryParams = [
      uid
    ]

    const query = `SELECT * FROM users WHERE id = $1`;
    db.query(query, queryParams).then(data => {
      const user = data.rows[0];
      res.send(user);
    })
    .catch(error => {
      res.status(400).send({ error })
    })
  });


  router.post('/users', (req, res) => {

    const { uid, email } = req.body.currentUser.user;
    const { firstName, lastName } = req.body.currentUser;
    const { program } = req.body;
    const queryParams = [
      uid,
      email,
      firstName,
      lastName,
      program
    ];

    console.log('User info', queryParams);

    const query = 
    `INSERT INTO users (id, email, "firstName", "lastName", program) 
    VALUES
    ($1, $2, $3, $4, $5)`;

    return db.query(query, queryParams).then((data) => {
      res.send('after database')
    })
    .catch(error => {
      console.log(error);
      res.status(400).send({ error })
    })
  });

  return router;
}