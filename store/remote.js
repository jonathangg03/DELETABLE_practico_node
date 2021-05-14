const request = require("request"); //DEPRECATED

function createRemoteDB(host, port) {
  const URL = `http://${host}:${port}`;

  function list(table) {
    return req("GET", table);
  }

  function get(table, id) {
    return req("GET", table, id);
  }

  // function upsert(table, body, isNew) {
  //   const data = {
  //     username: body.username,
  //     password: body.password,
  //   };
  //   if (isNew) {
  //     console.log("[data]: " + data);
  //     return req("POST", table, null, data);
  //   } else {
  //     return req("PUT", table, null, data);
  //   }
  // }

  // function query(table, query, join) {

  // }

  function req(method, table, id, data) {
    console.log(data);
    let url = `${URL}/${table}/`;

    if (id) {
      url = `${URL}/${table}/${id}`;
    }
    const body = "";

    return new Promise((resolve, reject) => {
      request(
        {
          method,
          headers: {
            "content-type": "application/json",
          },
          url,
          body,
        },
        (err, req, body) => {
          if (err) {
            console.error("Error con la DB remota: " + err);
            return reject(err.message);
          }
          const resp = JSON.parse(body); //La respuesta vendrá en texto plano
          return resolve(resp.body);
        }
      );
    });
  }

  return {
    list,
    get,
  };
}

module.exports = createRemoteDB;
