const mongoose = require('mongoose');
const { Schema } = mongoose;

const AlquilerSchema = new Schema({
    propietario: { type: Schema.Types.ObjectId, ref: 'Propietario', required: true },
    local: { type: Schema.Types.ObjectId, ref: 'Local', required: true },
    ambientes: { type: Number, required: true },
    costoAlquiler: { type: Number, required: true },
    fechaAlquiler: { type: Date, required: true, default: Date.now },
    interes : { type: Number, required: true },
    cuotas : [{ type: Schema.Types.ObjectId, ref: 'Cuota' }],
});

module.exports = mongoose.models.Alquiler || mongoose.model('Alquiler', AlquilerSchema);