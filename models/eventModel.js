const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: false,
  },
  fecha: {
    type: Date,
    required: true,
  },
  lugar: {
    type: String,
    required: true,
  },
  categoria: {
    type: String,
    enum: ["Musica", "Deportes", "Cultura", "Otros"],
    default: "Otros",
  },
  cliente: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Event", eventSchema);
