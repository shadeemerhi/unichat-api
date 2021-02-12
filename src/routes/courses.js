const router = require('express').Router();

module.exports = (db) => {

  router.get('/courses/rooms', (req, res) => {
    const query = 'SELECT * FROM courseRooms';
    db.query(query).then(data => {

      // Call helper function to organize courses into proper format
      /* 
        courses = {
          first_year = {
            math: [
              {
                name: 'MATH 275',
                title: 'Calculus for Engineers and Scientists',
                year: 1
              },
              {
                name: 'MATH 211',
                title: 'Linear Methods',
                year: 1
              }
            ],
            engg: [
              {
                name: 'ENGG 201',
                title: 'Solids, Liquids, and Gases',
                year: 1
              }
            ]
          },
          second_year = {
            math: [
              {
                name: 'MATH 375',
                title: 'Differential Equations',
                year: 2
              }
            ]
          }
        }
      */
      res.send(data.rows);
    })
  })
  return router;
}