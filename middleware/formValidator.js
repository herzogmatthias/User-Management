module.exports = {
    validate : (req, res , next) => {
        const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
        res.locals.hasErrors = false;
        if (req.body.rePassword !== req.body.password) {
            res.locals.pwInputError = "Passwords don't match";
            res.locals.hasErrors = true;
          }
          if(!emailRegexp.test(req.body.email)){
              res.locals.emailMatchError = "Email is not valid";
              res.locals.hasErrors = true;
          }
          if (req.body.email === ""){
              res.locals.emailRequiredError = "Email is required";
              res.locals.hasErrors = true;
          }
          if (req.body.name === "") {
            res.locals.usernameRequiredError = "Username is required";
            res.locals.hasErrors = true;
          }
          if (req.body.password === "") {
            res.locals.pwRequiredError = "Password is required";
            res.locals.hasErrors = true;
          }
          next();
    }
}