const auth = require("../../../auth");

module.exports = function secure(action) {
  function middleware(req, res, next) {
    switch (action) {
      case "update":
        auth.check.own(req, req.body.user);
        next();
        break;
      default:
        next();
    }
  }

  return middleware;
};
