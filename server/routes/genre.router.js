const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

router.get('/', (req, res) => {
  // Add query to get all genres
  const sqlText = `SELECT * FROM "genres" ORDER BY "id" ASC;`;
  pool
    .query(sqlText)
    .then((response) => {
      res.send(response.rows);
    })
    .catch((error) => {
      console.log('Error on get genres', error);
      res.sendStatus(500);
    });
});

module.exports = router;
