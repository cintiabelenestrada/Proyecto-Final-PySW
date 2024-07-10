const mongoose = require('mongoose');
const { Schema } = mongoose;

const InquilinoSchema = new Schema({
    apellido: { type: String, required: true },
    nombre: { type: String, required: true },
    dni: { type: String, required: true },
    telefono: { type: String, required: true }
});

module.exports = mongoose.models.Inquilino || mongoose.model('Inquilino', InquilinoSchema);



// const InquilinoSchema = new Schema({
//     apellido: { type: String, required: true },
//     nombre: { type: String, required: true },
//     dni: { type: String, required: true },
//     telefono: { type: String, required: true }
// });
// InquilinoSchema.add(UsuarioSchema);

// module.exports = mongoose.models.Inquilino || mongoose.model('Inquilino', InquilinoSchema);




