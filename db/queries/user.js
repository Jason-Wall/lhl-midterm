const db = require("../connection");

//4this query returns the data to users-api .then of the route /myinfo
const getUserData = (userId) => {
  return db
    .query(`SELECT maps.*, users.name FROM maps JOIN users ON user_id = users.id WHERE maps.user_id = $1;`, [userId])
    .then((maps) => {
      return db
        .query(`SELECT * FROM pins WHERE pins.user_id = $1;`, [userId])
        .then((pins) => {
          return db
            .query(
              `SELECT * FROM pin_favourites WHERE pin_favourites.user_id = $1`,
              [userId]
            )
            .then((pin_favourites) => {
              return db
                .query(
                  `SELECT * FROM map_favourites WHERE map_favourites.user_id = $1`,
                  [userId]
                )
                .then((map_favourites) => {
                  return db
                    .query(`SELECT * FROM users WHERE users.id = $1`, [userId])
                    .then((user) => {
                      return db
                        .query(
                          `SELECT maps.*, users.name FROM maps JOIN users ON user_id = users.id JOIN map_favourites ON maps.id = map_id WHERE maps.user_id = $1`,
                          [userId]
                        )
                        .then((favMaps) => {
                          return db
                            .query(
                              `SELECT * FROM pins JOIN pin_favourites ON pins.id = pin_id WHERE pins.user_id = $1`,
                              [userId]
                            )
                            .then((favPins) => {
                              return {
                                maps: maps.rows,
                                pins: pins.rows,
                                pin_favourites: pin_favourites.rows,
                                map_favourites: map_favourites.rows,
                                user: user.rows,
                                favMaps: favMaps.rows,
                                favPins: favPins.rows,
                              };
                            });
                        });
                    });
                });
            });
        });
    });
};

module.exports = { getUserData };
