// load .env data into process.env
require("dotenv").config();

// Web server config
const sassMiddleware = require("./lib/sass-middleware");
const express = require("express");
const morgan = require("morgan");

const PORT = process.env.PORT || 8080;
const app = express();

// app.set('view engine', 'ejs'); we are not using this, comment it out

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(
  "/styles",
  sassMiddleware({
    source: __dirname + "/styles",
    destination: __dirname + "/public/styles",
    isSass: false, // false => scss, true => sass
  })
);
app.use(express.static("public"));

// Database link
// const db = require('./db/dbconnection');

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
// const userApiRoutes = require("./routes/users-api");
// const widgetApiRoutes = require("./routes/widgets-api");
const homeRoute = require("./routes/home");
const mapRoutes = require("./routes/maps");

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
// Note: Endpoints that return data (eg. JSON) usually start with `/api`
// app.use("/api/users", userApiRoutes);
// app.use("/api/widgets", widgetApiRoutes);
app.use("/home", homeRoute);
app.use("/maps", mapRoutes);

// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

const cookieParser = require("cookie-parser");
app.use(cookieParser());

app.get("/login/:id", (req, res) => {
  console.log("inside route:");
  //set plain text cookie
  res.cookie("user_id", req.params.id);
  res.redirect("/home");
});

//please keep this comment here (Jenny) for use in future handlers
// if (req.cookies.user_id) {
//   res.redirect("/home");
// }
// app.post("/logout", (req, res) => {
//   res.clearCookie("user_id");
//   res.redirect("/login");
// });

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
