const db = require("../connection");

// Multi query for user main page.
// Gets array of maps created by user (maps)
// Gets array of maps favourited by user (favMaps)
// Gets array of maps contributed to by user (contributeMaps)
const getUserData = (userId) => {
  return db
    .query(
      `SELECT maps.*, users.name FROM maps JOIN users ON user_id = users.id WHERE maps.user_id = $1;`,
      [userId]
    )
    .then((maps) => {
      return db
        .query(
          `SELECT maps.*, users.name FROM maps JOIN users ON user_id = users.id JOIN map_favourites ON maps.id = map_id WHERE map_favourites.user_id = $1 AND fav_status = TRUE`,
          [userId]
        )
        .then((favMaps) => {
          return db
            .query(
              `SELECT maps.*, users.name FROM maps JOIN pins ON map_id = maps.id JOIN users ON maps.user_id = users.id WHERE pins.user_id = $1 GROUP BY maps.id, users.name`,
              [userId]
            )
            .then((contributeMaps) => {
              return {
                maps: maps.rows,
                favMaps: favMaps.rows,
                contributeMaps: contributeMaps.rows,
              };
            });
        });
    });
};


module.exports = { getUserData };
