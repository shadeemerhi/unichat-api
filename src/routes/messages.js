const router = require('express').Router();

module.exports = (helpers) => {

  router.get('/messages', (req, res) => {
    console.log('at the messages endpoint');
    res.send('from messages endpoint');
  })


  return router;
}