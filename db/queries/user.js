const db = require("../connection");

const getUserData = (userId) => {
  return db
    .query(`SELECT * FROM pins WHERE pins.user_id = $1;`, [userId])
    .then((pins) => {
      console.log(pins);
      return db
        .query(`SELECT * FROM maps WHERE maps.user_id = $1;`, [userId])
        .then((maps) => {
          console.log(maps);
          return {
            pins: pins.rows,
            maps: maps.rows,
          };
        });
    });
};
//4this returns the data to users-api

module.exports = { getUserData };
