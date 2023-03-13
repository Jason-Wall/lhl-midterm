const express = require("express");
const router = express.Router();

const usersdb = require("../db/queries/users");
const mapsdb = require("../db/queries/mapsdb");

router.get("/", (req, res) => {
  console.log("test:");
  // usersdb.getUsers().then((user) => {
  //   console.log(user);
  //   res.send(user);
  // });
  // $.class.remove()
});

module.exports = router;
