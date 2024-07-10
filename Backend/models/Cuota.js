const mongoose = require('mongoose');
const { Schema } = mongoose;

const CuotaSchema = new Schema({
    alquiler: { type: Schema.Types.ObjectId, ref: 'Alquiler', required: true },
    montoTotal: { type: Number, required: true },
    montoRestante: { type: Number, required: true },
    fecha: { type: Date, default: Date.now },
    fechaVencimiento: { 
        type: Date, 
        default: () => new Date(new Date().getTime() + (10 * 24 * 60 * 60 * 1000)) // Agrega 30 días a la fecha actual
    },
    estado: { 
        type: String, 
        enum: ['Pendiente', 'Pagada'],
        default: 'Pendiente'
    }
});

module.exports = mongoose.models.Cuota || mongoose.model('Cuota', CuotaSchema);