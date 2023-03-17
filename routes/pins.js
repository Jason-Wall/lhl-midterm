const express = require("express");
const router = express.Router();
const mapsdb = require("../db/queries/mapsdb");


// GET /pins/:id/ - Take you to the pin information
router.get("/:id", (req, res) => {
  let pinID = req.params.id;
  mapsdb.getPinData(pinID)
  .then((pinObj) => {
    res.send(pinObj);
  });
});


// POST  /pins/:id - Create a pin
router.post("/:id/create", (req, res) => {
  mapsdb.addPin(req.body)
  .then((pin) => {
   let mapId = pin.rows[0].map_id;
  return mapsdb.getMapData(mapId)
  })
  .then((mapObj) => {
    res.send({ mapObj, api: process.env.GOOGLE_MAPS_API_KEY })
  })
});


// PATCH /pins/:id - Edit pin info
router.patch("/:id", (req, res) => {
  mapsdb.editPin(req.body)
  .then((pin) => {
   let mapId = pin.rows[0].map_id;
  return mapsdb.getMapData(mapId)
  })
  .then((mapObj) => {
    res.send({ mapObj, api: process.env.GOOGLE_MAPS_API_KEY })
  })
});


// DELETE /pins/delete - delete pin
router.delete("/delete", (req, res) => {
  mapsdb.deletePin(req.body.pin_id)
  .then((mapId) => {
    return mapsdb.getMapData(mapId)
  })
  .then((mapObj) => {
    res.send({ mapObj, api: process.env.GOOGLE_MAPS_API_KEY });
  });
});


module.exports = router;
