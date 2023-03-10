/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();
const usersdb = require('../db/queries/users')

router.get("/", (req, res) => {
  usersdb.getUsers()
  .then(users => {
    res.send(users);
  })
});






module.exports = router;





