const router = require('express').Router();

module.exports = (db) => {

  router.get('/users/:email', (req, res) => {
    const email = req.params.email;
    console.log('email at endpoint', email);
    const queryParams = [
      email
    ];

    const query = `SELECT * FROM users WHERE email = $1`;
    db.query(query, queryParams).then(data => {

      // Temp setTimeout to mock api response time
      setTimeout(() => {
        res.send(data.rows);
      }, 500)
    })
  })


  router.post('/users', (req, res) => {

    console.log(req.body);

    const { uid, email } = req.body.currentUser.user;
    const { firstName, lastName, program } = req.body.currentUser;
    const queryParams = [
      uid,
      email,
      firstName,
      lastName,
      program
    ];

    console.log('user stuff', queryParams);

    const query = 
    `INSERT INTO users (id, email, first_name, last_name, program) 
    VALUES
    ($1, $2, $3, $4, $5)`;

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