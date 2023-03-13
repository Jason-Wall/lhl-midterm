const db = require('../connection');

const getMaps = () => {
  return db.query('SELECT * FROM maps;')
    .then(maps => {
      return maps.rows;
    })
    .catch(function (xhr, status, error) {
              console.log("Error: " + error);
            })
};

const getAMap = () => {
  return db.query('SELECT * FROM maps WHERE maps.id = 4;')
    .then(data => {
      return data.rows[0];
    })
    .catch(function (xhr, status, error) {
      console.log("Error: " + error);
    })
  };



module.exports = {
  getMaps,
  getAMap };
