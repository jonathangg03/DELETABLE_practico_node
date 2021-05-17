const { nanoid } = require("nanoid");
const auth = require("../auth");
const TABLA = "user";

module.exports = (injectedStore, injectedCache) => {
  let store = injectedStore;
  let cache = injectedCache;

  if (!store) {
    store = require("../../../store/dummy");
  }
  if (!cache) {
    cache = require("../../../store/dummy"); //En caso de colocar esto en producción, no colocamos dummy, sino la Db que vamos a usar
  }

  async function list() {
    let users = await cache.list(TABLA);
    if (!users) {
      console.log("No se encontro en cache. Buscando en DB");
      users = await store.list(TABLA);
      cache.upsert(TABLA, users);
    } else {
      console.log("Traemos datos de cache");
    }
    return users;
  }

  function get(id) {
    return store.get(TABLA, id);
  }

  async function upsert(body, isNew) {
    const user = {
      name: body.name,
      username: body.username,
    };

    if (body.id) {
      user.id = body.id;
    } else {
      user.id = nanoid();
    }

    if (body.password || body.username) {
      await auth.upsert(
        {
          id: user.id,
          username: user.username,
          password: body.password,
        },
        isNew
      );
    }

    return store.upsert(TABLA, user, isNew);
  }

  function follow(from, to) {
    return store.upsert(
      TABLA + "_follow",
      {
        user_from: from,
        user_to: to,
      },
      true
    );
  }

  function following(userId) {
    const join = {};
    join[TABLA] = "user_to"; //{{}}
    const query = { user_from: userId };

    return store.query(TABLA + "_follow", query, join);
  }
  // function remove(id) {
  //   return store.remove(TABLA, id);
  // }

  return {
    list,
    get,
    upsert,
    follow,
    following,
    // remove,
  };
};
