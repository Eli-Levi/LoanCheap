const { jwtAuthentication } = require("../middlewares");
const controller = require("../controllers/user.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get(
    "/api/test/user",
    [jwtAuthentication.checkToken, jwtAuthentication.checkUser],
    controller.userBoard
  );

  app.get(
    "/api/test/admin",
    [jwtAuthentication.checkToken, jwtAuthentication.checkAdmin],
    controller.adminBoard
  );
};