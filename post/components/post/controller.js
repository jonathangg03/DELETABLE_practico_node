const { nanoid } = require("nanoid");
const error = require("../../../utils/error");
const TABLE = "post";

module.exports = (store) => {
  if (!store) {
    store = require("../../../store/dummy");
  }

  const list = () => {
    return store.list(TABLE);
  };

  const get = (id) => {
    return store.get(TABLE, id);
  };

  const upsert = async (body, isNew) => {
    const data = {
      id: body.id || nanoid(),
      text: body.text || "",
      user: body.user,
    };
    if (!body.user) {
      throw error("Debes colocar un usuario", 500);
    }
    return store.upsert(TABLE, data, isNew);
  };

  return {
    list,
    get,
    upsert,
  };
};
