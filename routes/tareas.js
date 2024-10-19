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


router.delete('/borrar/:id', async(req,res)=>{
    try {
        let {id} = req.params;
        let respuesta = await modelTarea.findByIdAndDelete(id);        
        if(respuesta != null){
            res.status(200).send({ mensaje: "Tarea borrada exitosamente", body: respuesta })   
        }else{
            res.status(400).send({ mensaje: "Error al borrar una tarea", error: error });
        }

    } catch (error) {
        res.status(400).send({ mensaje: "Error al borrar una tarea", error: error });
    }
})

router.get('/:id', async(req,res)=>{
    try {
        let {id} = req.params;
        let respuesta = await modelTarea.findById(id);
        res.status(200).send({ mensaje: "Tarea encontrada exitosamente por id", body: respuesta }) 
    } catch (error) {
        res.status(400).send({ mensaje: "Error al buscar una tarea por id", error: error });
    }  
})

router.put('/:id/completar', async(req,res)=>{
    try {
        let {id} = req.params;
        let tareaVieja = await modelTarea.findByIdAndUpdate(id,{completada:true}, { new: true });
        res.status(200).send({ mensaje: "Tarea completada exitosamente", body: tareaVieja }) 
    } catch (error) {
        res.status(400).send({ mensaje: "Error al completar la tarea", error: error });
    }  
})

router.get('/prioridad/:nivel', async(req,res)=>{
    try {
        let {nivel} = req.params;
        let tareas = await modelTarea.find({prioridad:nivel});
        
        if(tareas.length == 0){
         return res.status(400).send({ mensaje: "no se encontraron tareas con esa prioridad", body: tareas});
        } 
        res.status(200).send({ mensaje: "Tareas con prioridad ", body: tareas });
    } catch (error) {
        res.status(400).send({ mensaje: "Error filtrar tareas", error: error });
    }  
})

module.exports = router;