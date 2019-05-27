"use strict";
var express = require("express");
var router = express.Router();
var store = require("../store");
var randomstring = require("randomstring");

/* GET users listing. */
router.post("/", function(req, res, next) {
  console.log(req.body);
  const paths = store.paths;
  paths.push({ path: req.body.newPath, id: randomstring.generate() });
  console.log(paths);
  res.render("partials/paths", { newPath: req.body.newPath, paths: paths });
});

module.exports = router;
