/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();
const usersdb = require('../db/queries/users');
const mapsdb = require('../db/queries/mapsdb');

// Jasons example function - Note - conflict with below get/
// router.get("/", (req, res) => {
//   usersdb.getUsers()
//   .then(users => {
//     res.send(users);
//   })
// });






// GET / - (logged in?) Home (Summary of maps i’ve created or contributed to, summary of favs)
//             (not logged) redirect to maps




// GET /maps   - Gets all maps

router.get("/", (req, res) => {
  mapsdb.getMaps()
  .then(maps => {
    res.send(maps);
  })
});



// GET /maps/:id/   - Get individual map

router.get("/:id", (req, res) => {
  // console.log(req.body);
  let mapID = req.params.id;
  mapsdb.getAMap(mapID)
  .then(map => {
    res.send(map);
  })
});


// GET /maps/:id/:pin - Take you to the pin information



// GET /maps/:id/edit - Take you to map edit



// GET /maps/:id/:pin/edit - Take you to the pin edit page



// POST /maps - Create new map



// POST  /maps/:id - Create a pin



// POST /maps/:id/favorite - Add favorite to map.



// POST/maps/:id/:pin/favorite - Add favorite to pin. (Stretch)

// PATCH /maps/:id - Edit map info (title, cover photo, desc)



// PATCH /maps/:id/:pin - Edit pin info



// DELETE /maps/:id - Delete a map



// DELETE /maps/:id/:pin - Delete a pin






module.exports = router;





