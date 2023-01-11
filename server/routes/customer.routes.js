const { jwtAuthentication, checkAddLoan } = require("../middlewares");
const controller = require("../controllers/customer.controller");
/**
 * This is the routes file fot the customer role API's.
 */
module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/user/findloans",
    [jwtAuthentication.checkToken, jwtAuthentication.checkUser],
    controller.costumerGetAllLoans
  );

  app.get(
    "/api/user/getallrequests",
    [jwtAuthentication.checkToken, jwtAuthentication.checkUser],
    controller.costumerGetAllRequests
  );

  app.post(
    "/api/user/request",
    [jwtAuthentication.checkToken, jwtAuthentication.checkUser],
    controller.costumerRequest
  );
};
