const db = require("../connection");

//4this query returns the data to users-api .then of the route /myinfo
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
              `SELECT maps.* FROM maps JOIN pins ON map_id = maps.id WHERE pins.user_id = $1`,
              [userId]
            )
            .then((contributeMaps) => {
              return {
                maps: maps.rows,
                // pins: pins.rows,
                // pin_favourites: pin_favourites.rows,
                // map_favourites: map_favourites.rows,
                // user: user.rows,
                favMaps: favMaps.rows,
                contributeMaps: contributeMaps.rows,
              };
            });
        });
    });
};
      // return db
      //   .query(`SELECT * FROM pins WHERE pins.user_id = $1;`, [userId])
      //   .then((pins) => {
          // return db
          //   .query(
          //     `SELECT * FROM pin_favourites WHERE pin_favourites.user_id = $1`,
          //     [userId]
          //   )
          //   .then((pin_favourites) => {
              // return db
              //   .query(
              //     `SELECT * FROM map_favourites WHERE map_favourites.user_id = $1 AND fav_status = TRUE`,
              //     [userId]
              //   )
              //   .then((map_favourites) => {
                  // return db
                  //   .query(`SELECT * FROM users WHERE users.id = $1`, [userId])
                  //   .then((user) => {
//             });
//         });
//     });
// };

module.exports = { getUserData };
