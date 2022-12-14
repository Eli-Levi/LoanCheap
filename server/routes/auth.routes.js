const { checkSignUp } = require("../middlewares");
const controller = require("../controllers/auth.controller");
/**
 * This is the routes file fot the authentication API's.
 */
module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/auth/signup",
    [
      checkSignUp.isValidEmail,
      checkSignUp.checkDuplicateEmail,
      checkSignUp.isValidPhone,
      checkSignUp.checkRoles
    ],
    controller.signup
  );

  app.post("/api/auth/signin", controller.signin);
};