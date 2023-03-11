/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("users");
});

// // rather than having a user login, logout or registration, Andy suggested that we do the below:
// app.get("/login/id", (req, res) => {
//   // set an encrypted cookie
//   req.cookies.user_id = req.params.id;

//   //plaintext cookies
//   res.cookie("user_id", req.params.id);

//   //res.redirect(‘/’)
// });

module.exports = router;
