const db = require("../connection");

// getFavMaps - Return list of map id's for users favourites.
const getFavMaps = (user_id) => {
  return db
    .query(`SELECT maps.id FROM maps JOIN map_favourites ON map_id = maps.id WHERE map_favourites.user_id = ${user_id} AND fav_status = TRUE;`)
    .then((data) => {
      return data.rows;
    })
    .catch(function (xhr, status, error) {
      console.log("Error: " + error);
    });
};

// toggleMapFav - Toggles favourite status. Creates a new favourite if it doesn't already exist.
const toggleMapFav = (user_id,map_id) => {
  return db
    .query(`
    INSERT INTO map_favourites (user_id, map_id)
    VALUES (${user_id},${map_id})
    ON CONFLICT ON CONSTRAINT unique_favourite DO
    UPDATE
    SET fav_status = NOT map_favourites.fav_status
    WHERE map_favourites.user_id = ${user_id} AND map_favourites.map_id = ${map_id};
    `)
    .then(() => {
      return data.rows;
    })
    .catch(function (xhr, status, error) {
      console.log("Error: " + error);
    });
};

module.exports = {
  getFavMaps,
  toggleMapFav
}
