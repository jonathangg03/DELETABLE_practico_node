const express = require("express");
const config = require("../config.js");
const user = require("./components/user/network");
const auth = require("./components/auth/network");
const post = require("./components/post/network");
const swaggerUI = require("swagger-ui-express");
const swaggerDoc = require("./swagger.json");
const errors = require("../network/errors");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//ROUTER
app.use("/api/user", user);
app.use("/api/auth", auth);
app.use("/api/post", post);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDoc));
app.use(errors); //DEBE SER EL ULTIMO

app.listen(config.api.port, () => {
  console.log(`API escuchando en el puerto ${config.api.port}`);
});
