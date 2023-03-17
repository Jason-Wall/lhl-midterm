const db = require("../connection");

// getMaps - Get object of all maps with creator name
const getMaps = () => {
  return db
    .query(
      `
    SELECT maps.*, users.name FROM maps
    JOIN users ON user_id = users.id;
    `
    )
    .then((maps) => {
      return maps.rows;
    })
    .catch(function (xhr, status, error) {
      console.log("Error: " + error);
    });
};

// getAMap - Get individual map object by map id.
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


// Edit map
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


// Create Map
const createMap = (data) => {
  if (data.map_url === "") {
    data.map_url =
      "https://images.pexels.com/photos/1078850/pexels-photo-1078850.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";
  }
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


// Delete Map
const deleteMap = (mapId) => {
  return db.query(`DELETE FROM maps WHERE id = $1;`, [mapId]);
};


// getMapData - Get map and pin data for individual map. Used in single Map View.
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
    .catch(function (xhr, status, error) {
      console.log("Error: " + error);
    });
};


// getPins - Get object of all pins and their creators name
const getPins = (mapID) => {
  return db
    .query(`SELECT pins.*, users.name FROM pins JOIN users ON user_id = users.id WHERE map_id = ${mapID};`)
    .then((data) => {
      return data.rows;
    })
    .catch(function (xhr, status, error) {
      console.log("Error: " + error);
    });
};


// getPinData - Get individual pin data
const getPinData = (pinID) => {
  return db
    .query(`SELECT * FROM pins WHERE pins.id = ${pinID};`)
    .then((data) => {
      return data.rows[0];
    })
    .catch(function (xhr, status, error) {
      console.log("Error: " + error);
    });
};


// Edit Pin
const editPin = (data) => {
  queryVars = [
    data.id,
    data.pin_title,
    data.pin_description,
    data.pin_url,
    data.street_address,
    data.city,
    data.country,
  ];
  return db
    .query(
      `
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
      queryVars
    )
    .then((data) => {
      return data;
    });
};


// Delete Pin
const deletePin = (pinID) => {
  return db.query(`DELETE FROM pins WHERE pins.id = $1 RETURNING map_id`, [pinID])
  .then((mapId) => {
    return mapId.rows[0].map_id
  })
  .catch(function (xhr, status, error) {
      console.log("Error: " + error);
    });
};


// addPin
const addPin = (pinCreation) => {
  if (pinCreation.pin_url === "") {
    pinCreation.pin_url =
      "https://img.freepik.com/free-vector/location_53876-25530.jpg?t=st=1678987209~exp=1678987809~hmac=67360a480d47250c074b3a292783c7876973ff673daa994fd0113c008498365f";
  }
  pinInfo = [
    pinCreation.map_id,
    pinCreation.user_id,
    pinCreation.pin_title,
    pinCreation.pin_description,
    pinCreation.pin_url,
    pinCreation.street_address,
    pinCreation.city,
    pinCreation.country,
  ];
  return db.query(
    `INSERT INTO pins (map_id, user_id, pin_title, pin_description, pin_url, street_address, city, country)
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
    pinInfo
  );
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
  addPin,
};
