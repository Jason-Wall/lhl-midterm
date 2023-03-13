const db = require('../connection');

const getAMap = () => {
  return db.query('SELECT * FROM maps WHERE maps.id = 4;')
    .then(data => {
      console.log(data.rows[0])
      return data.rows[0];
    });
};

module.exports = { getAMap };
