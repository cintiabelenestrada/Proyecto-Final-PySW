const mongoose = require('mongoose');
const { Schema } = mongoose;

const PagoSchema = new Schema({
    usuario: { type: Schema.Types.ObjectId, ref: 'Usuario', required: true },
    monto: { type: Number, required: true },
    fechaCreacion: { type: Date, default: Date.now },
    fechaActualizacion : { type: Date, default: Date.now },
    status: {
        type: String,
        enum: ['pending', 'success', 'failure'],
        default: 'pending'
    },
    preference: { type: String, required: true },
    tipo :{
        type: String,
        enum: ['MercadoPago', 'Efectivo', 'Transferencia'],
        default: 'MercadoPago'
    },
    cuota: { type: Schema.Types.ObjectId, ref: 'Cuota', required: true }
});

module.exports = mongoose.models.Pago || mongoose.model('Pago', PagoSchema);