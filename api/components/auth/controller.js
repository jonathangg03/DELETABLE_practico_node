const auth = require("../../../auth");
const TABLA = "auth";
module.exports = (injectedStore) => {
  let store = injectedStore;
  if (!store) {
    store = require("../../../store/dummy");
  }

  async function login(username, password) {
    const data = await store.query(TABLA, {
      username: username, //buscará en todos los campos username que tengan el valor del parametro
    });

    if (data.password === password) {
      //Generar token
      console.log("token");
      return auth.sign(data);
    } else {
      throw new Error("Info invalida");
    }
  }

  function upsert(data) {
    const authData = {
      id: data.id,
    };

    if (data.username) {
      authData.username = data.username;
    }
    if (data.password) {
      authData.password = data.password;
    }

    return store.upsert(TABLA, authData);
  }

  return {
    upsert,
    login,
  };
};
