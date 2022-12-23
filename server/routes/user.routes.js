const { jwtAuthentication, checkAddLoan } = require("../middlewares");
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

  app.get(
    "/api/test/admin",
    [jwtAuthentication.checkToken, jwtAuthentication.checkAdmin],
    controller.adminBoard
  );

  app.post(
    "/api/admin/addloan",
    [
      jwtAuthentication.checkToken,
      jwtAuthentication.checkAdmin,
      checkAddLoan.checkDuplicateLoanName,
    ],
    controller.adminAddLoan
  );

  app.put(
    "/api/admin/editloan",
    [jwtAuthentication.checkToken, jwtAuthentication.checkAdmin],
    controller.adminEditLoan
  );

  app.put(
    "/api/changeRequestStatus",
    [jwtAuthentication.checkToken],
    controller.changeRequestStatus
  );

  app.get(
    "/api/admin/getalladminloans",
    [jwtAuthentication.checkToken, jwtAuthentication.checkAdmin],
    controller.adminGetAllLoans
  );

  app.get(
    "/api/admin/getallrequests",
    [jwtAuthentication.checkToken, jwtAuthentication.checkAdmin],
    controller.adminGetAllRequests
  );

  app.post(
    "/api/admin/getcontactinfo",
    [jwtAuthentication.checkToken, jwtAuthentication.checkAdmin],
    controller.getContactInfo
  );
};
