//TODO REDIS
const redis = require("redis");
const config = require("../config");

const client = redis.createClient({
  host: config.redis.host,
  port: config.redis.port,
  password: config.redis.password,
});

//Obj a string cuando guardemos en la DB, y string a obj cuando leamos

function list(table) {
  return new Promise((resolve, reject) => {
    client.get(table, (error, data) => {
      if (error) return reject(error);
      let res = data || null;
      if (data) {
        res = JSON.parse(data);
      }
      resolve(res);
    });
  });
}

function get(table, id) {
  return new Promise((resolve, reject) => {});
}

function upsert(table, data) {
  return new Promise((resolve, reject) => {
    let key = table;

    if (data && data.id) {
      key = key + "_" + data.id;
    }
    client.setex(key, 10, JSON.stringify(data));
    resolve(true);
  });
}

module.exports = {
  list,
  get,
  upsert,
};
