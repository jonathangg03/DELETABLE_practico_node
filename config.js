module.exports = {
  api: {
    port: process.env.API_PORT || 3000,
  },
  jwt: {
    secret: process.env.JWT_SECRET || "notasecret",
  },
  mysql: {
    host: process.env.MYSQL_HOST || "remotemysql.com",
    user: process.env.MYSQL_USER || "uP4Y9tRU5j",
    password: process.env.MYSQL_PASS || "LQNzJtXQ0g",
    database: process.env.MYSQL_DB || "uP4Y9tRU5j",
  },
  mysqlService: {
    port: process.env.MYSQL_SRV_PORT || 3001,
  },
};
