/*
 * All routes for User Data are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /api/users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();
const userQueries = require("../db/queries/users");

router.post("/login/:id", (req, res) => {
  //set plain text cookie
  res.cookie("user_id", req.params.id).send({
    message: "user logged in",
    user: req.params.id,
  });
});

router.post("/logout", (req, res) => {
  //remove plain text cookie
  res.clearCookie("user_id").send({
    message: "user logged out",
  });
});
//to target the cookie, the cookie is equal to req.cookies.user_id

module.exports = router;
