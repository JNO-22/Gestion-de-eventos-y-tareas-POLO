const express = require("express");
const router = express.Router();
const eventModel = require("../models/eventModel");
const userModel = require("../models/userModel");

// FUNCIONES CRUD DEL EVENTO
//Crear un nuevo evento -- CREATE
router.post("/eventos", async (req, res) => {
  const body = req.body;
  const userID = body.cliente;
  const parseFecha = new Date(body.fecha);
  body.fecha = parseFecha;
  try {
    const user = await userModel.findById(userID); // buscar el usuario
    if (!user) {
      res.status(404).send({ mensaje: "Usuario no encontrado" });
    }
    const nuevoEvento = await eventModel.create(body); // se crea el nuevo evento
    user.eventos.push(nuevoEvento._id); // se agrega el ID de referencia del evento al usuario
    await user.save(); // se actualiza el usuario
    res.status(200).send(nuevoEvento);
  } catch (error) {
    res
      .status(400)
      .send({ mensaje: "Error al crear el evento", error: "error" + error });
  }
});

//Obtener todos los eventos -- READ
router.get("/eventos", async (req, res) => {
  try {
    const eventos = await eventModel.find(); // Obtener los eventos
    res.status(200).send(eventos);
  } catch (error) {
    res.status(400).send({ mensaje: "Error al obtener los eventos", error });
  }
});

//Actualizar un evento -- UPDATE
router.put("/eventos/:id", async (req, res) => {
  const id = req.params.id;
  const body = req.body;
  const parseFecha = new Date(body.fecha);
  body.fecha = parseFecha;
  try {
    const eventoActualizado = await eventModel.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });
    if (!eventoActualizado) {
      res.status(404).send({ mensaje: "Evento no encontrado" });
    }
    res.statur(200).send(eventoActualizado);
  } catch (error) {
    res.status(400).send({ mensaje: "Error al actualizar el evento", error });
  }
});

//Eliminar un evento -- DELETE
router.delete("/eventos/:id", async (req, res) => {
  try {
    const evento = await eventModel.findByIdAndDelete(req.params.id);
    const user = await userModel.findById(evento.cliente); // buscar el o los usuario
    user.eventos.pull(evento._id); // se elimina el ID de referencia del evento
    await user.save(); // se actualiza el usuario
    if (!user) {
      res.status(404).send({ mensaje: "Usuario no encontrado" });
    }
    res.status(200).send({ mensaje: "Evento eliminado", evento });
  } catch (error) {
    res.status(400).send({ mensaje: "Error al eliminar el evento", error });
  }
});

//Obtener eventos de un usuario -- Endpoint
router.get("/eventos", async (req, res) => {
  const userID = req.body.cliente;
  try {
    const posts = find({ cliente: userID });
    res.status(200).send(posts);
  } catch (error) {
    res.status(400).send({ mensaje: "Error al obtener el evento", error });
  }
});

module.exports = router;
