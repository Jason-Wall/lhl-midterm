/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();
const usersdb = require("../db/queries/users");
const mapsdb = require("../db/queries/mapsdb");
const favsdb = require("../db/queries/favsdb");

// GET /maps   - Gets all maps

router.get("/", (req, res) => {
  mapsdb.getMaps().then((maps) => {
    res.send(maps);
  });
});


// GET /maps/favs/   - Get list of favorite maps
router.get("/favs", (req, res) => {
  let user_id = req.cookies.user_id;
  favsdb.getFavMaps(user_id)
  .then((maps) => {
    res.send(maps);
  });
});


// GET /maps/:id/   - Get individual map
router.get("/:id", (req, res) => {
  let mapID = req.params.id;
  mapsdb.getMapData(mapID)
  .then((mapObj) => {
    res.send({ mapObj, api: process.env.GOOGLE_MAPS_API_KEY });
  });
});

// GET /maps/:id/:pin - Take you to the pin information
// router.get("/:id/:pinID", (req, res) => {
//   console.log('hi')
//   let pinID = req.params.id;
//   mapsdb.getPinData(pinID)
//   .then((pinObj) => {
//     console.log('pinObj', pinObj)
//     res.send(pinObj);
//   });
// });

// GET /maps/:id/edit - Take you to map edit

// GET /maps/:id/:pin/edit - Take you to the pin edit page

// POST /maps - Create new map
router.post("/:id/create", (req, res) => {
  mapsdb.createMap(req.body).then((response) => {
    res.send(response.rows[0]);
  });
});

// POST  /maps/:id - Create a pin

// POST /maps/:id/favorite - Add favorite to map.

// POST/maps/:id/:pin/favorite - Add favorite to pin. (Stretch)

// PATCH /maps/:id - Edit map info (title, cover photo, desc)
router.patch("/:id", (req, res) => {
  const mapEdits = req.body;
  mapsdb.editMap(mapEdits).then((returnMap) => {
    res.send(returnMap);
  });
});


// PATCH /maps/:id/fav - Toggle map favourite
router.patch("/:id/favs", (req, res) => {
  const map_id = req.params.id;
  const user_id = req.cookies.user_id;
  favsdb.toggleMapFav(user_id,map_id).then((returnFav) => {
    console.log('returnFav:  ',returnFav);
    res.send(returnFav);
  });
});


// PATCH /maps/:id/:pin - Edit pin info
// router.patch("/:id/:pin", (req, res) => {
//   const PinEdits = req.body;
//   mapsdb.editPin(PinEdits).then((returnPin) => {
//     console.log("route maps, returnPin:", returnPin);
//     res.send(returnPin);
//   });
// });

// DELETE /maps/delete - Delete a map
router.delete("/delete", (req, res) => {
  mapsdb.deleteMap(req.body.map_id).then((response) => {
    res.send(response);
  });
});

// DELETE /maps/:id/:pin - Delete a pin

module.exports = router;
