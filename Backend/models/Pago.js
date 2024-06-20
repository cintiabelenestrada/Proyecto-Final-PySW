const mongoose = require('mongoose');
const { Schema } = mongoose;

const PagoSchema = new Schema({
    usuario: { type: Schema.Types.ObjectId, ref: 'Usuario', required: true },
    monto: { type: Number, required: true },
    fecha: { type: Date, default: Date.now },
    detalle: { type: String, required: false }
});

module.exports = mongoose.models.Pago || mongoose.model('Pago', PagoSchema);