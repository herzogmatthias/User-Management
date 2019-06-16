"use strict";
var express = require("express");
var router = express.Router({ mergeParams: true });
var store = require("../store");

/* GET home page. */
router.get("/", function(req, res, next) {
  store.paths = [];
  res.render("pages/index", {
    submitted: false,
    paths: store.paths,
    success: req.query.success,
    isEdit: false
  });
});

module.exports = router;
