const express = require("express");
const config = require("../config");
const router = require("./network");

const app = express();

app.use(express.json());
app.use("/", router);
//Rutas
app.listen(config.mysqlService.port, () => {
  console.log(
    `Servicio de mysql escuchando desde http://localhost:${config.mysqlService.port}`
  );
});
