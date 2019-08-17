"use strict";
var express = require("express");
var router = express.Router();
var argon2 = require("argon2");
var store = require("../store");
var formValidator = require("../middleware/formValidator");
var userRepository = require("../repositories/userRepository");

/* GET users listing. */
router.post("/", formValidator.validate, async function(req, res, next) {
  if (res.locals.hasErrors) {
    res.render("pages/index", {
      email: req.body.email,
      id: req.body.id,
      success: false,
      name: req.body.name,
      password: req.body.password,
      rePassword: req.body.rePassword,
      newPath: req.body.newPath,
      paths: store.paths,
      submitted: true,
      isEdit: true,
      pwInputError:
        res.locals.pwInputError != undefined ? res.locals.pwInputError : false,
      usernameRequiredError:
        res.locals.usernameRequiredError != undefined
          ? res.locals.usernameRequiredError
          : false,
      pwRequiredError:
        res.locals.pwRequiredError != undefined
          ? res.locals.pwRequiredError
          : false,
      emailRequiredError:
        res.locals.emailRequiredError != undefined
          ? res.locals.emailRequiredError
          : false,
      emailMatchError:
        res.locals.emailMatchError != undefined
          ? res.locals.emailMatchError
          : false
    });
  } else {
    const user = {
      id: req.body.id,
      email: req.body.email,
      name: req.body.name,
      password:
        req.body.password.includes("p=") &&
        req.body.password.includes("$argon2i$")
          ? req.body.password
          : argon2.hash(req.body.password)
    };
    console.log(store.paths);
    const success = await userRepository.editUser(user, store.paths);
    store.paths = [];
    res.redirect("/users");
  }
});

module.exports = router;
