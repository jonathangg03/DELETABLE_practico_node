const TABLA = "post";

module.exports = (injectedStore) => {
  let store = injectedStore; // Para casos en que el store no venga
  if (!store) {
    store = require("../../../store/dummy");
  }

  function list() {
    return store.list(TABLA);
  }

  return {
    list,
  };
};
