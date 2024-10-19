const dbConnect = require("./config/db");
const eventoRouter = require("./routes/eventos");
const userRouter = require("./routes/user");
const express = require("express");
const app = express();

app.use(express.json());
app.use(eventoRouter, userRouter);

dbConnect()
  .then(() => {
    app.listen(3000, () => {
      console.log("Servidor corriendo en el puerto 3000");
    });
  })
  .catch((error) => {
    console.log("Error al conectarse a la base de datos", error);
  });
