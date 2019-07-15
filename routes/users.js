"use strict";
var express = require("express");
var router = express.Router();
var userRepository = require("../repositories/userRepository");

/* GET users listing. */
router.get("/", async function(req, res, next) {
  var users = JSON.parse(JSON.stringify(await userRepository.getAllUsers()));
  res.render("./pages/users", { users: users });
});

module.exports = router;
