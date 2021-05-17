const config = require("../../../config");
let store, cache;

if (config.remoteDB === true) {
  store = require("../../../store/remoteMysql");
  cache = require("../../../store/remoteCache");
} else {
  store = require("../../../store/mysql");
  cache = require("../../../store/redis");
}
const controller = require("./controller");

module.exports = controller(store, cache);
