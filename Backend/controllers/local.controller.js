const Local = require('../models/Local');
const postFacebookService = require('../services/PostFacebook');
const { post } = require('../routes/locales.route');


const localCtrl = {}
localCtrl.createLocal = async (req, res) => {
    var local = new Local(req.body);
    try {
        await local.save();
        res.json({
            'status': '1',
            'msg': 'Local guardado.'
        })
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error procesando operacion.'
        })
    }
}

//get que trae todos los Locales
localCtrl.getLocales = async (req, res) => {
    var locales = await Local.find();
    res.json(locales);
}

//get que trae solo los locales habilitados
localCtrl.getLocalesHabilitados = async (req, res) => {
    try {
        const localesHabilidados = await Local.find({ habilitado: true, alquilado: false });
        res.json(localesHabilidados);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los locales', error });
    }
};

//get para obtener un Local por id
localCtrl.getLocalID = async (req, res) => {
    try {
        const local = await Local.findById(req.params.id);
        res.json(local);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el local por ID', error });
    }
}

//UPDATE
localCtrl.editLocal = async (req, res) => {
    try {
        await Local.updateOne({ _id: req.params.id }, req.body);
        res.json({
            'status': '1',
            'msg': 'Local edit'
        })
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error procesando la operacion, Edicion'
        })
    }
}

//DELETE
localCtrl.deleteLocal = async (req, res) => {
    console.log("hola");
    try {
        await Local.deleteOne({ _id: req.params.id });
        res.json({
            status: '1',
            msg: 'Local removed'
        })
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error procesando la operacion de Eliminación'
        })
    }
}

localCtrl.publish = async (req, res) => {
    try {
        const local = await Local.findById(req.body.id) ;

        // Llama al método publish del servicio
        const publicacionId = await postFacebookService.publish(local);
        res.status(200).json({
            status: '1',
            msg: 'Publicación exitosa',
            data: publicacionId
        });
    } catch (error) {
        res.status(400).json({
            status: '0',
            msg: 'Error publicando en Facebook',
        });
    }
}

localCtrl.deletePublish = async (req, res) => {

    try {
        const informacion = await postFacebookService.deletePublish(req.params.id);
        res.status(200).json({
            status: '1',
            msg: 'Publicación eliminada',
            data: informacion
        });
    } catch (error) {
        res.status(400).json({
            status: '0',
            msg: 'Error eliminando la publicación',
        });

    }

}

module.exports = localCtrl;