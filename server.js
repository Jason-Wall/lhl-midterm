// load .env data into process.env
require("dotenv").config();

// Web server config
const sassMiddleware = require("./lib/sass-middleware");
const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

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
app.use(cookieParser());

// Database link
// const db = require('./db/dbconnection');

// Separated Routes for each Resource
const userApiRoutes = require("./routes/users-api");
const mapRoutes = require("./routes/maps");
const pinRoutes = require("./routes/pins");

// Mount all resource routes
// Note: Endpoints that return data (eg. JSON) usually start with `/api`
app.use("/users-api", userApiRoutes);
app.use("/maps", mapRoutes);
app.use("/pins", pinRoutes);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
