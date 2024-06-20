const mongoose = require('mongoose');
const { Schema } = mongoose;

const NovedadesSchema = new Schema({
    Usuario: { type: Schema.Types.ObjectId, ref: 'Usuario', required: true },
    Texto: { type: String, required: true },
    estado: { type: String, required: true }
});

module.exports = mongoose.models.Novedades || mongoose.model('Novedades', NovedadesSchema);

