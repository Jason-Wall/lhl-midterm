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


// GET /pins/:id/ - Take you to the pin information
router.get("/:id", (req, res) => {
  console.log('hi')
  let pinID = req.params.id;
  mapsdb.getPinData(pinID)
  .then((pinObj) => {
    res.send(pinObj);
  });
});

// GET /pins/:id/edit - Take you to the pin edit page


// POST  /pins/:id - Create a pin


// PATCH /pins/:id - Edit pin info
router.patch("/:id", (req, res) => {
  mapsdb.editPin(req.body)
  .then((pin) => {
   let mapId = pin.rows[0].map_id;
  return mapsdb.getMapData(mapId)
  })
  .then((mapObj) => {
    console.log(mapObj)
    res.send({ mapObj, api: process.env.GOOGLE_MAPS_API_KEY })
  })
});

// DELETE
router.delete("/delete", (req, res) => {
  mapsdb.deletePin(req.body.pin_id).then((response) => {
    res.send(response);
  });
});


module.exports = router;
