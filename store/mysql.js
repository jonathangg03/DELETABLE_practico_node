const mysql = require("mysql");
const config = require("../config");

const dbConf = {
  host: config.mysql.host,
  user: config.mysql.user,
  password: config.mysql.password,
  database: config.mysql.database,
};

let connection;

function handleCon() {
  connection = mysql.createConnection(dbConf);

  connection.connect((err) => {
    if (err) {
      console.err("[db error]:" + err);
      setTimeout(handleCon, 2000); //Sí la conexión falla, se vuelve a intntar
    } else {
      console.log("DB CONNECTED");
    }
  });

  connection.on("error", (error) => {
    if (error.code === "PROTOCOL_CONNECTION_LOST") {
      //Sí se perdió la conexión
      handleCon();
    } else {
      throw error;
    }
  });
}

handleCon();

function list(table) {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM ${table}`, (err, data) => {
      if (err) return reject(err);
      resolve(data);
    });
  });
}

function get(table, id) {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM ${table} WHERE id='${id}'`, (err, data) => {
      if (err) return reject(err);
      resolve(data);
    });
  });
}

function insert(table, data) {
  return new Promise((resolve, reject) => {
    connection.query(`INSERT INTO ${table} SET ?`, data, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
}

function update(table, data) {
  return new Promise((resolve, reject) => {
    connection.query(
      `UPDATE ${table} SET ? WHERE id=?`,
      [data, data.id],
      (err, result) => {
        if (err) return reject(err);
        resolve(result);
      }
    );
  });
}

function upsert(table, data, isNew) {
  if (data && !isNew) {
    return update(table, data);
  } else {
    return insert(table, data);
  }
}

function query(table, query, join) {
  let joinQuery = "";
  if (join) {
    const key = Object.keys(join)[0]; //user: tabla a la que queremos acceder
    const val = join[key];
    joinQuery = `JOIN ${key} ON ${table}.${val} = ${key}.id`;
  }
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT * FROM ${table} ${joinQuery} WHERE ${table}.?`,
      query,
      (err, res) => {
        if (err) return reject(err);
        if (joinQuery) {
          resolve({ ...res } || null); //Como resultado nos vendrá un array
        } else {
          console.log("[res]: " + res);
          resolve({ ...res[0] } || null); //Como resultado nos vendrá un array
        }
      }
    );
  });
}

module.exports = {
  list,
  get,
  upsert,
  query,
};
