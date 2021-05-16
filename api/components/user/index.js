const config = require("../../../config");
let store;
if (config.remoteDB === true) {
  store = require("../../../store/remoteMysql");
} else {
  store = require("../../../store/mysql");
}
const controller = require("./controller");

module.exports = controller(store);
