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

function list(table, id) {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM ${table}`, (err, data) => {
      if (err) return reject(err);
      resolve(data);
    });
  });
}

module.exports = {
  list,
};
