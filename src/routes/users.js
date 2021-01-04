const router = require('express').Router();

module.exports = (db) => {

  router.post('/users', (req, res) => {

    console.log('at the api', req.body);

    const { uid, email } = req.body.user;
    const { program } = req.body;
    // setTimeout(() => {
    //   res.send('coming from backend!');
    // }, 500)
    const queryParams = [
      uid,
      email,
      program
    ];

    console.log('user stuff', queryParams);
    
    const query = 
    `INSERT INTO userse (id, email, program) 
    VALUES
    ($1, $2, $3)`;

    db.query(query, queryParams).then(() => {
      res.send('after database')
    })
    .catch(error => {
      res.send(error);
    })
  })

  return router;
}