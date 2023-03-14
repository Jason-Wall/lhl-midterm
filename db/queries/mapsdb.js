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

const getAMap = (mapID) => {
  return db.query(`SELECT * FROM maps WHERE maps.id = ${mapID};`)
    .then(data => {
      return data.rows[0];
    })
    .catch(function (xhr, status, error) {
      console.log("Error: " + error);
    })
  };



const editMap = (mapEdits) => {
  const queryVars = [mapEdits.map_id, mapEdits.map_title, mapEdits.map_description, mapEdits.map_url];
  return db.query(
    `UPDATE maps
    SET map_title = $2,
        map_description = $3,
        map_url = $4
    WHERE id = $1
    RETURNING *;
    `, queryVars)
}



module.exports = {
  getMaps,
  getAMap,
  editMap };
