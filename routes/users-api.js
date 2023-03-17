const express = require("express");
const router = express.Router();
const { getUserData } = require("../db/queries/user");

router.post("/login/:id", (req, res) => {
  //set plain text cookie
  res.cookie("user_id", req.params.id).send({
    message: "user logged in",
    user: req.params.id,
  });
});


// get user info
router.get("/myinfo", (req, res) => {
  const userId = req.cookies.user_id;
  getUserData(userId).then((data) => {
    res.send(data);
  });
});


//remove plain text cookie
router.post("/logout", (req, res) => {
  res.clearCookie("user_id").send({
    message: "user logged out",
  });
});

module.exports = router;
