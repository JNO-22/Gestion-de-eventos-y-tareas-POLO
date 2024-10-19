const express = require("express");
const router = express.Router();

let modelTarea = require('../models/tareaModel');

// Obtener todas las tareas
router.get('/', async(req,res)=>{
    try {
        let respuesta = await modelTarea.find();
        if(!respuesta.length){
            throw new Error({ message: "No se encontraron tareas en la app"});
        }else{
            res.status(200).send({ mensaje: "Devolviendo exitosamente todas las tareas", body: respuesta })
        } 
    } catch (error) {
        res.status(400).send({ mensaje: "Error al listar todas las tareas", error: error });
    }
})

router.post('/crear', async(req,res)=>{
    try {
        let tareaNueva = req.body;
        let respuesta = await modelTarea.create(tareaNueva);
        res.status(200).send({ mensaje: "Tarea creada exitosamente", body: respuesta })   
    } catch (error) {
        res.status(400).send({ mensaje: "Error al crear una nueva tarea", error: error });
    }
})

router.put('/editar/:id', async(req,res)=>{
    try {
        let {id} = req.params;
        let tareaActualizada = req.body;
        let respuesta = await modelTarea.findByIdAndUpdate(id, tareaActualizada, {
            new: true,
            runValidators: true
        });
        if(respuesta != null){
            res.status(200).send({ mensaje: "Tarea actualizada exitosamente", body: respuesta })   
        }else{
            res.status(400).send({ mensaje: "Error al actualizar una nueva tarea", error: error });
        }

    } catch (error) {
        res.status(400).send({ mensaje: "Error al actualizar una nueva tarea", error: error });
    }
})

module.exports = router;