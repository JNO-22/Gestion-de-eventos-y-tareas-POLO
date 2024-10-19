const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
    },
    correo: {
      type: String,
      required: true,
      unique: true,
    },
    contraseña: {
      type: String,
      required: true,
    },
    telefono: {
      type: String,
      required: true,
    },
    rol: {
      type: String,
      enum: ["admin", "cliente"],
      default: "Cliente",
    },
    eventos: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Event",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
