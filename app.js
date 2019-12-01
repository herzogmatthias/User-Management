"use strict";
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var sassMiddleware = require("node-sass-middleware");
var hbs = require("hbs");
var cors = require("cors");
var helmet = require("helmet");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var newUserRouter = require("./routes/newUser");
var newPathRouter = require("./routes/newPath");
var deletePathRouter = require("./routes/deletePath");
var updatePathRouter = require("./routes/updatePath");
var deleteUserRouter = require("./routes/deleteUser");
var initEditUserRouter = require("./routes/initEditUser");
var editUserRouter = require("./routes/editUser");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view options", { layout: "pages/layout.hbs" });
app.set("view engine", "hbs");
hbs.registerPartials(path.join(__dirname, "views/partials"));
hbs.registerHelper("ifCond", function(v1, operator, v2, options) {
  switch (operator) {
    case "==":
      return v1 == v2 ? options.fn(this) : options.inverse(this);
    case "===":
      return v1 === v2 ? options.fn(this) : options.inverse(this);
    case "!=":
      return v1 != v2 ? options.fn(this) : options.inverse(this);
    case "!==":
      return v1 !== v2 ? options.fn(this) : options.inverse(this);
    case "<":
      return v1 < v2 ? options.fn(this) : options.inverse(this);
    case "<=":
      return v1 <= v2 ? options.fn(this) : options.inverse(this);
    case ">":
      return v1 > v2 ? options.fn(this) : options.inverse(this);
    case ">=":
      return v1 >= v2 ? options.fn(this) : options.inverse(this);
    case "&&":
      return v1 && v2 ? options.fn(this) : options.inverse(this);
    case "||":
      return v1 || v2 ? options.fn(this) : options.inverse(this);
    default:
      return options.inverse(this);
  }
});
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:5238", methods: ["POST", "GET"] }));
app.use(helmet());
app.use(
  sassMiddleware({
    src: path.join(__dirname, "public"),
    dest: path.join(__dirname, "public"),
    indentedSyntax: false, // true = .sass and false = .scss
    sourceMap: true
  })
);
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(__dirname + "/node_modules/bootstrap/dist"));
app.use(express.static(__dirname + "/node_modules/jquery/dist"));
app.use(express.static(__dirname + "/node_modules/popper.js/dist"));
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/newUser", newUserRouter);
app.use("/newPath", newPathRouter);
app.use("/deletePath/:id", deletePathRouter);
app.use("/updatePath/:id", updatePathRouter);
app.use("/deleteUser/:id", deleteUserRouter);
app.use("/editUser/init/:id", initEditUserRouter);
app.use("/editUser/error", editUserRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("pages/error");
});

module.exports = app;
