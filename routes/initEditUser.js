"use strict";
var express = require("express");
var router = express.Router({ mergeParams: true });
var store = require("../store");
var db = require("../database");

/* GET home page. */
router.get("/", async function(req, res, next) {
  store.userToEditId = req.params.id;
  const userToEdit = await db.findUser(store.userToEditId);
  store.paths = userToEdit.Directories;
  res.render("pages/index", {
    submitted: false,
    paths: store.paths,
    id: userToEdit.id,
    success: req.query.success,
    email: userToEdit.email,
    name: userToEdit.name,
    password: userToEdit.password,
    rePassword: userToEdit.password,
    paths: store.paths,
    isEdit: true
  });
});

module.exports = router;
