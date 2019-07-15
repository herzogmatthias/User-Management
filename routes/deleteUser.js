"use strict";
var express = require("express");
var router = express.Router({ mergeParams: true });
var userRepository = require("../repositories/userRepository");

/* GET users listing. */
router.get("/", function(req, res, next) {
  userRepository.deleteUser(req.params.id);
  res.redirect("/users");
});

module.exports = router;
