const Alquiler = require('../models/Alquiler');
const Local = require('../models/Local');

const alquilerService = {};

const createAlquiler = async (alquilerData) => {
    const local = await Local.findById(alquilerData.local);
    if (!local) {
        throw new Error('Local no encontrado.');
    }
    if (!local.habilitado) {
        throw new Error('El Local no está habilitado.');
    }
    if (local.alquilado) {
        throw new Error('El Local ya está alquilado.');
    }

    const alquiler = new Alquiler(alquilerData);
    await alquiler.save();

    // Cambiar el estado del Local a alquilado
    local.alquilado = true;
    await local.save();

    return alquiler;
};

module.exports = {
    createAlquiler,
};

// module.exports = alquilerService;
