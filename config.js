module.exports = {
  api: {
    port: process.env.API_PORT || 3000,
  },
  post: {
    port: process.env.POST_PORT || 3002,
  },
  jwt: {
    secret: process.env.JWT_SECRET || "notasecret",
  },
  mysql: {
    host: process.env.MYSQL_HOST || "",
    user: process.env.MYSQL_USER || "uP4Y9tRU5j",
    password: process.env.MYSQL_PASS || "LQNzJtXQ0g",
    database: process.env.MYSQL_DB || "uP4Y9tRU5j",
  },
  mysqlService: {
    port: process.env.MYSQL_SRV_PORT || 3001,
    host: process.env.MYSQL_SRV_HOST || "localhost",
  },
  cacheService: {
    port: process.env.CACHE_SRV_PORT || 3003,
    host: process.env.CACHE_SRV_HOST || "localhost",
  },
  remoteDB: process.env.REMOTE_DB || false,
};
