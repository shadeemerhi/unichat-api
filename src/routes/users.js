const router = require('express').Router();

module.exports = (db) => {

  router.get('/users/:id', (req, res) => {
    const uid = req.params.id;
    const queryParams = [
      uid
    ];

    const query = `SELECT * FROM users WHERE id = $1`;
    db.query(query, queryParams).then(data => {
      const user = data.rows[0];
      res.send(user);
    })
    .catch(error => {
      res.status(500).send({ error })
    })
  });

  router.get('/users/email/:email', (req, res) => {
    const email = req.params.email;
    const queryParams = [
      email
    ];

    const query = `SELECT * FROM users WHERE email = $1`;
    db.query(query, queryParams).then(data => {
      const user = data.rows[0];
      res.send(user);
    })
    .catch(error => {
      res.status(500).send({ error });
    })
  })


  router.post('/users', (req, res) => {

    // console.log('the user stuff', req.body);

    const { uid, email } = req.body.user;
    const { firstName, lastName, program } = req.body;
    // const { program } = req.body;
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

    throw new Error('Thrown Error');

    return db.query(query, queryParams).then((data) => {
      res.send('after database')

    })
    // .catch(error => {
    //   console.log(error);
    //   res.status(500).send({ error })
    // })
  });

  return router;
}