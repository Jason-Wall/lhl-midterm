const db = require("../connection");

const getMaps = () => {
  return db
    .query("SELECT * FROM maps;")
    .then((maps) => {
      return maps.rows;
    })
    .catch(function (xhr, status, error) {
      console.log("Error: " + error);
    });
};

const getAMap = (mapID) => {
  return db
    .query(`SELECT * FROM maps WHERE maps.id = ${mapID};`)
    .then((data) => {
      return data.rows[0];
    })
    .catch(function (xhr, status, error) {
      console.log("Error: " + error);
    });
};

const getARandomMap = () => {
  return db
    .query(`SELECT id FROM maps`)
    .then((data) => {
      return data;
    })
    .catch(function (xhr, status, error) {
      console.log("Error: " + error);
    });
};

const editMap = (mapEdits) => {
  const queryVars = [
    mapEdits.map_id,
    mapEdits.map_title,
    mapEdits.map_description,
    mapEdits.map_url,
  ];
  return db.query(
    `UPDATE maps
    SET map_title = $2,
        map_description = $3,
        map_url = $4
    WHERE id = $1
    RETURNING *;
    `,
    queryVars
  );
};

const createMap = (data) => {
  const queryVars = [
    data.user_id,
    data.map_title,
    data.map_description,
    data.map_url,
    data.city,
    data.country,
  ];
  return db.query(
    `INSERT INTO maps (user_id, map_title, map_description, map_url, city, country)
    VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
    queryVars
  );
};

const getPins = (mapID) => {
  return db
    .query(`SELECT * FROM pins WHERE map_id = ${mapID};`)
    .then((data) => {
      console.log(data.rows)
      return data.rows;
    })
    .catch(function (xhr, status, error) {
      console.log("Error: " + error);
    });
};

const getMapData = (mapID) => {
  mapInfo = {};
  return getAMap(mapID)
  .then((data) => {
    mapInfo.mapData = data
    return getPins(mapID)
  })
    .then((pinData) => {
      mapInfo.pinsData = pinData
      console.log(mapInfo)
      return mapInfo;
    })
  .catch(function (xhr, status, error) {
    console.log("Error: " + error)
  })
};

module.exports = {
  getMaps,
  getAMap,
  editMap,
  getARandomMap,
  createMap,
  getMapData
};
