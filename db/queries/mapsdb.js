const db = require("../connection");

const getMaps = () => {
  return db
    .query(`
    SELECT maps.*, users.name FROM maps
    JOIN users ON user_id = users.id;
    `)
    .then((maps) => {
      return maps.rows;
    })
    .catch(function(xhr, status, error) {
      console.log("Error: " + error);
    });
};

const getAMap = (mapID) => {
  return db
    .query(`SELECT * FROM maps WHERE maps.id = ${mapID};`)
    .then((data) => {
      console.log(data.rows[0]);
      return data.rows[0];
    })
    .catch(function(xhr, status, error) {
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

const deleteMap = (mapId) => {
  return db.query(`DELETE FROM maps WHERE id = $1;`, [mapId]);
};

const getPins = (mapID) => {
  return db
    .query(`SELECT * FROM pins WHERE map_id = ${mapID};`)
    .then((data) => {
      return data.rows;
    })
    .catch(function(xhr, status, error) {
      console.log("Error: " + error);
    });
};

const getMapData = (mapID) => {
  mapInfo = {};
  return getAMap(mapID)
    .then((data) => {
      mapInfo.mapData = data;
      return getPins(mapID);
    })
    .then((pinData) => {
      mapInfo.pinsData = pinData;
      return mapInfo;
    })
    .catch(function(xhr, status, error) {
      console.log("Error: " + error);
    });
};

const editPin = (data) => {
  queryVars = [
    data.id,
    data.pin_title,
    data.pin_description,
    data.pin_url,
    data.street_address,
    data.city,
    data.country
  ];
  return db
    .query(`
  UPDATE pins
  SET pin_title = $2,
  pin_description = $3,
  pin_url = $4,
  street_address = $5,
  city = $6,
  country = $7
  WHERE id = $1
  RETURNING *;
  `,
      queryVars)
    .then((data) => {
      return data;
    });
};

const deletePin = (pinID) => {
  return db
    .query(`DELETE FROM pins WHERE pins.id = $1`, [pinID]);
};

const getPinData = (pinID) => {
  return db
    .query(`SELECT * FROM pins WHERE pins.id = ${pinID};`)
    .then((data) => {
      return data.rows[0];
    })
    .catch(function(xhr, status, error) {
      console.log("Error: " + error);
    });
};

const addPin = (pinCreation) => {
  pinInfo = [
    pinCreation.map_id,
    pinCreation.user_id,
    pinCreation.pin_title,
    pinCreation.pin_description,
    // pin_url: ,
    pinCreation.street_address,
    pinCreation.city,
    pinCreation.country
  ];
  return db.query(`INSERT INTO pins (map_id, user_id, pin_title, pin_description, pin_url, street_address, city, country)
  VALUES ($1, $2, $3, $4, 'pin_url', $5, $6, $7) RETURNING *`, pinInfo);
};

module.exports = {
  getMaps,
  getAMap,
  editMap,
  createMap,
  deleteMap,
  getMapData,
  editPin,
  deletePin,
  getPinData,
  addPin
};
