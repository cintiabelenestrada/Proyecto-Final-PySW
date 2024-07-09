const mongoose = require('mongoose');
const { Schema } = mongoose;

const LocalSchema = new Schema({
    nombre: { type: String, required: true },
    direccion: { type: String, required: true },
    descripcion: { type: String, required: true },
    superficie: { type: Number, required: true },
    habilitado: { type: Boolean, required: true },
    customers: { type: Number, required: true },
    pathimagen: { type: String, required: true },
    alquilado: { type: Boolean, required: true }
});

module.exports = mongoose.models.Local || mongoose.model('Local', LocalSchema);
