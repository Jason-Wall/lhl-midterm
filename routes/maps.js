const express = require("express");
const router = express.Router();
const mapsdb = require("../db/queries/mapsdb");
const favsdb = require("../db/queries/favsdb");

// GET /maps   - Gets all maps
router.get("/", (req, res) => {
  mapsdb.getMaps().then((maps) => {
    res.send({ maps, api: process.env.GOOGLE_MAPS_API_KEY });
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


// POST /maps - Create new map
router.post("/:id/create", (req, res) => {
  mapsdb.createMap(req.body).then((response) => {
    res.send(response.rows[0]);
  });
});


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


// DELETE /maps/delete - Delete a map
router.delete("/delete", (req, res) => {
  mapsdb.deleteMap(req.body.map_id).then((response) => {
    res.send(response);
  });
});

module.exports = router;
