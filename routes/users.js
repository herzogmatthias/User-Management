"use strict";
var express = require("express");
var router = express.Router();
var database = require("../database");

/* GET users listing. */
router.get("/", async function(req, res, next) {
  var users = JSON.parse(JSON.stringify(await database.getAllUsers()));
  console.log(users);
  res.render("./pages/users", { users: users });
});

module.exports = router;
