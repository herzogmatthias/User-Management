"use strict";
var express = require("express");
var router = express.Router({ mergeParams: true });
var store = require("../store");
var userRepository = require("../repositories/userRepository");

/* GET home page. */
router.get("/", async function(req, res, next) {
  store.userToEditId = req.params.id;
  var userToEdit = await userRepository.findUser(store.userToEditId);
  userToEdit = userToEdit.get({ plain: true });
  userToEdit.Directories.forEach((dir) => {
    store.paths.push({id: dir.id, name: dir.path, read: dir.UserDirectory.read, write: dir.UserDirectory.write})
  })
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
