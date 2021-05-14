const express = require("express");
const config = require("../config.js");
const post = require("./components/post/network");
const errors = require("../network/errors");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//ROUTER
app.use("/api/post", post);
app.use(errors); //DEBE SER EL ULTIMO

app.listen(config.post.port, () => {
  console.log(`Servicio post escuchando en el puerto ${config.post.port}`);
});
