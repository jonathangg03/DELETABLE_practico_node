const request = require("request"); //DEPRECATED

function createRemoteDB(host, port) {
  const URL = `http://${host}:${port}`;

  function list(table) {
    return req("GET", table);
  }

  function get(table, id) {
    return req("GET", table, id);
  }

  function insert(table, data) {
    return req("POST", table, null, data);
  }

  function update(table, data) {
    return req("PUT", table, null, data);
  }

  function upsert(table, body, isNew) {
    if (isNew) {
      return insert(table, body);
    } else {
      return update(table, body);
    }
  }

  function query(table, query, join) {
    return req("POST", table + "/login", null, { query, join });
  }

  function req(method, table, id, data) {
    let url = `${URL}/${table}/`;

    if (id) {
      url = `${URL}/${table}/${id}`;
    }

    let body = "";

    if (data) {
      body = JSON.stringify(data);
    }
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
    upsert,
    query,
  };
}

module.exports = createRemoteDB;
