/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();

//favourite pin (stretch)
router.post("/maps/:id/pin/favourite", (req, res) => {});

//favourite map
router.post("/maps/:id/favourite", (req, res) => {});

//create map
router.post("/maps/:id/create", (req, res) => {});

//create pin
router.post("/maps/:id/pin", (req, res) => {});

//edit map info (title, cover photo, desc)
router.patch("/maps/:id", (req, res) => {});

//edit pin info
router.patch("/maps/:id/pin", (req, res) => {});

//delete a map
router.delete("/maps/:id/delete", (req, res) => {});

//delete a pin
router.delete("/maps/:id/pin/delete", (req, res) => {});

module.exports = router;
