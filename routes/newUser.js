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
      success: false,
      isEdit: false,
      name: req.body.name,
      password: req.body.password,
      rePassword: req.body.rePassword,
      newPath: req.body.newPath,
      paths: store.paths,
      submitted: true,
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
      email: req.body.email,
      name: req.body.name,
      password: await argon2.hash(req.body.password)
    };
    const directories = store.paths;
    const success = await userRepository.addUser(user, directories);
    store.paths = [];
    res.redirect("/?success=true");
  }
});

module.exports = router;
