const Propietario = require('../models/Propietario');
const propietaioCtrl = {};

propietaioCtrl.getPropietarios = async (req, res) => {
    const propietarios = await Propietario.find();
    res.json(propietarios);
};

propietaioCtrl.getPropietarioById = async (req, res) => {
    const id = req.params.id;
    try {
        const propietario = await Propietario.findById(id);
        res.status(200).json(propietario);
    } catch (error) {
        console.error(error);
        res.status(404).json({
            message: 'Propietario no encontrado',
        })
    }
}

propietaioCtrl.createPropietario = async (req, res) => {
    const propietario = new Propietario(req.body);
    try {
        await propietario.save();
        res.status(200).json({
            'status': '0',
            'message': 'Propietario creado con exito'
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            'status': '1',
            'message': 'No se pudo crear el propietario'
        });
    }
}

propietaioCtrl.updatePropietario = async (req, res) => {
    const id = req.params.id;
    const propietario = req.body;
    try {
        await Propietario.findByIdAndUpdate(id, propietario);
        res.status(200).json({
            'status': '0',
            'message': 'Propietario actualizado correctamente'
        });
    } catch (error) {
        res.status(400).json({
            'status': '1',
            'message': 'Error al actualizar Propietario'
        });
    }
}

propietaioCtrl.deletePropietario = async (req, res) => {
    try {
        await Propietario.findByIdAndDelete(req.params.id);
        res.status(200).json({
            'status': '0',
            'message': 'Propietario eliminado correctamente'
        });
    } catch (error) {
        res.status(400).json({
            'status': '1',
            'message': 'Error al eliminar Propietario'
        });
    }
}

module.exports = propietaioCtrl;