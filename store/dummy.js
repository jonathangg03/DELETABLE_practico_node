//DB dummy
const db = {
  user: {
    id: 1,
    name: "Carlos",
  },
};

const list = (table) => {
  return db[table];
};

const get = (table, id) => {
  let collection = list(table);
  return collection.filter((item) => item.id === id)[0] || null;
};

const upsert = (table, data) => {
  //actualizar o insertar
  db[collection].push(data);
};

const remove = (table, id) => {
  return true;
};

module.exports = {
  list,
  get,
  upsert,
  remove,
};
