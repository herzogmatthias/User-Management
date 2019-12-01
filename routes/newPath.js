"use strict";
var express = require("express");
var router = express.Router();
var store = require("../store");
var randomstring = require("randomstring");

/* GET users listing. */
router.post("/", function(req, res, next) {
  const paths = store.paths;
  paths.push({ name: req.body.name, read: req.body.read, write: req.body.write, id: randomstring.generate() });
  res.render("partials/paths", { newPath: req.body, paths: paths });
});

module.exports = router;
