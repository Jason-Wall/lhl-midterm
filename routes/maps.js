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

// GET /maps   - Gets all maps

router.get("/", (req, res) => {
  mapsdb.getMaps().then((maps) => {
    res.send(maps);
  });
});

// GET /maps/:id/   - Get individual map

router.get("/:id", (req, res) => {
  let mapID = req.params.id;
  mapsdb.getAMap(mapID).then((map) => {
    res.send({ map, api: process.env.GOOGLE_MAPS_API_KEY });
  });
});

// GET /maps/:id/:pin - Take you to the pin information

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
    console.log("route maps, returnMap:", returnMap);
    res.send(returnMap);
  });
});

// PATCH /maps/:id/:pin - Edit pin info

// DELETE /maps/delete - Delete a map
router.delete("/delete", (req, res) => {
  mapsdb.deleteMap(req.body.map_id).then((response) => {
    res.send(response);
  });
});

// DELETE /maps/:id/:pin - Delete a pin

module.exports = router;
