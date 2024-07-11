const mongoose = require('mongoose');
const { Schema } = mongoose;

const AlquilerSchema = new Schema({
    inquilino: { type: Schema.Types.ObjectId, ref: 'Usuario', required: true },
    local: { type: Schema.Types.ObjectId, ref: 'Local', required: true },
    plazoMes: { type: Number, required: true },
    costoAlquiler: { type: Number, required: true },
    fechaAlquiler: { type: Date, default: Date.now },
    interesAnual: { type: Number, required: true },
    activo: { type: Boolean, default: true }
});

module.exports = mongoose.models.Alquiler || mongoose.model('Alquiler', AlquilerSchema);