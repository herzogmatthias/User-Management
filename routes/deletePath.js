"use strict";
var express = require("express");
var router = express.Router({ mergeParams: true });
var store = require("../store");

/* GET users listing. */
router.get("/", function(req, res, next) {
  const paths = store.paths;
  paths.splice(paths.findIndex(p => p.id == req.params.id), 1);
  res.render("partials/paths", { newPath: req.body.newPath, paths: paths });
});

module.exports = router;
