const { jwtAuthentication, checkAddLoan } = require("../middlewares");
const controller = require("../controllers/admin.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

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

  app.get(
    "/api/admin/getCharts",
    [jwtAuthentication.checkToken, jwtAuthentication.checkAdmin],
    controller.getAdminCharts
  );
};
