const TABLA = "user";

module.exports = (injectedStore) => {
  let store = injectedStore; // Para casos en que el store no venga
  if (!store) {
    store = require("../../../store/dummy");
  }

  function list() {
    return store.list(TABLA);
  }

  function get(id) {
    return store.get(TABLA, id);
  }

  return {
    list,
    get,
  };
};
