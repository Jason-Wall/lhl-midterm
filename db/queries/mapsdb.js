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

module.exports = { getMaps };
