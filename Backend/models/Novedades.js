const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NovedadesSchema = new Schema({
    Usuario: { type: Schema.Types.ObjectId, ref: 'Usuario', required: true },
    Texto: { type: String, required: true },
    titulo: {type: String, required: true}, 
    imagen: { type: String, required: true },
    estado: { type: Boolean, required: true }
});

module.exports = mongoose.model('Novedades', NovedadesSchema);
