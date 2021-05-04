//DB dummy
const db = {
  user: [
    {
      id: "1",
      name: "Carlos",
      username: "car29",
      password: "1234",
    },
  ],
};

const list = async (table) => {
  return db[table] || [];
};

const get = async (table, id) => {
  let collection = await list(table);
  return collection.filter((item) => item.id === id)[0] || null;
};

const upsert = async (table, data) => {
  if (!db[table]) {
    db[table] = [];
  }
  db[table].push(data);
  console.log(db);
};

async function query(table, queryObj) {
  const col = await list(table); //trae la tabla auth
  const keys = Object.keys(queryObj); //Nos trae el key del objeto queryObj, en este caso sería ['username']
  const key = keys[0]; //username

  return col.filter((item) => item[key] === queryObj[key])[0] || null;
  //retorna el 1er elemento del array creado por filter
  //item[key]: El username de cada objeto de la tabla auth
  //queryObj[key]: El username del queryObject se le da valor en el network, y será el username que buscamos
}

module.exports = {
  list,
  get,
  upsert,
  query,
};
