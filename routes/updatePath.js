"use strict";
var express = require("express");
var router = express.Router({ mergeParams: true });
var store = require("../store");

/* GET users listing. */
router.get("/", function(req, res, next) {
  const paths = store.paths;
  const path = paths.splice(paths.findIndex(p => p.id == req.params.id), 1)[0];
  const checked = (req.query.checked === 'true')
  if(req.query.type === 'write') {
      path.write = !checked
  } else {
    path.read = !checked
  }
  paths.push(path);
  console.log(paths)
  res.render("partials/paths", { newPath: req.body.newPath, paths: paths });
});

module.exports = router;
