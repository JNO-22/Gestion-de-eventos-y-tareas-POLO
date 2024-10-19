const mongoose = require('mongoose');

const tareaSchema =  new mongoose.Schema(
    {
        titulo: {
            type: String,
            required: true
        },
        descripcion: {
            type: String,
            required: true
        },
        "fecha-limite": {
            type: Date,
            required: true
        },
        prioridad: {
            type: String,
            enum: ['alta', 'media', 'baja'],
            default: 'media'
        },
        completada: {
            type: Boolean,
            default: false
        }
    }
)

const ModelTarea = mongoose.model("tareas", tareaSchema);

module.exports = ModelTarea;