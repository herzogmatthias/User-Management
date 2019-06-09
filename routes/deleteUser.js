"use strict";
var express = require("express");
var router = express.Router({ mergeParams: true });
var db = require("../database");

/* GET users listing. */
router.get("/", function(req, res, next) {
  db.deleteUser(req.params.id);
  res.redirect("/users");
});

module.exports = router;
