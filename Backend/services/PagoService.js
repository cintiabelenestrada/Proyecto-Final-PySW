const Pago = require('../models/Pago');
const Alquiler = require('../models/Alquiler');
const Cuota = require('../models/Cuota');
const Usuario = require('../models/Usuario');
const emailSender = require('../services/emailSender');

class PagoService {

    /**
     * Metodo encargado de registrar un pago
     * @param {*} pago 
     * @returns pago registrado
     */
    async registrarPago(pago) {
        try {
            const nuevoPago = new Pago(pago);
            await nuevoPago.save();
            console.log("Pago registrado correctamente");
            return nuevoPago; 
        } catch (error) {
            console.error("Error al registrar el pago: ", error);
            throw new Error("Error al registrar el pago: " + error.message);
        }
    }

    /**
     * Metodo encargado de obtener los pagos por id de cuota
     * @param {*} idCuota 
     * @returns pagos obtenidos
     */
    async obtenerPagosPorIdCuota(idCuota) {
        try {
            const pagos = await Pago.find({ cuota: idCuota , status: 'success'});
            console.log("Pagos obtenidos correctamente");
            return pagos;
        } catch (error) {
            console.error("Error al obtener los pagos: ", error);
            throw new Error("Error al obtener los pagos: " + error.message);
        }
    }

    /**
     * Metodo encargado de obtener un pago por id
     * @param {*} id
     * @returns pago obtenido
    */
    async obtenerPagoPorId(id) {
        try {
            const pago = await Pago.findById(id);
            if (!pago) {
                throw new Error("Pago no encontrado");
            }
            console.log("Pago obtenido correctamente");
            return pago;
        } catch (error) {
            console.error("Error al obtener el pago: ", error);
            throw new Error("Error al obtener el pago: " + error.message);
        }
    }
    
    /**
     * Metodo encargado de obtener los pagos
     * Metodo reservado para administradores o testeos
     * @returns pagos obtenidos
     */
    async obtenerPagos() {
        try {
            const pagos = await Pago.find();
            console.log("Pagos obtenidos correctamente");
            return pagos;
        } catch (error) {
            console.error("Error al obtener los pagos: ", error);
            throw new Error("Error al obtener los pagos: " + error.message);
        }
    } 

    /**
     * Metodo encargado de actualizar el estado de un pago
     * @param {*} id 
     * @param {*} estado {pending, success, failure}
     * @returns pago actual
     */
    async actualizarEstadoPago(idPago, estado) {
        try {
            const pagoBuscado = await Pago.findById(idPago);
            if (pagoBuscado.status === estado){
                throw new Error("El pago ya se encuentra en ese estado");
            }
            const updateData = {
                status: estado,
                fechaActualizacion: new Date()
            };
            const pagoActualizado = await Pago.findByIdAndUpdate (idPago, updateData , { new: true });
            if (pagoActualizado.status === 'success') {
                const cuota = await Cuota.findById(pagoActualizado.cuota);
                if (!cuota) {
                    throw new Error("Cuota no encontrada");
                }
                const alquiler = await Alquiler.findById(cuota.alquiler);
                const usuario = await Usuario.findById(alquiler.inquilino);
                if (!usuario) {
                    throw new Error("Usuario no encontrado");
                }
                await emailSender.enviarComprobanteDePago(usuario.email, pagoActualizado);
            }
            return pagoActualizado;
        } catch (error) {
            console.error("Error al actualizar el estado del pago: ", error);
            throw new Error("Error al actualizar el estado del pago: " + error.message);
        }
    }

    /**
     * Metodo encargado de actualizar el ID de preferencia de un pago
     * @param {*} id 
     * @param {*} preference 
     * @returns pago actual
     */
    async actualizarPagoConPreference(id, preference) {
        try {
            const pago = await Pago.findById(id);
            if (!pago) {
                throw new Error("Pago no encontrado");
            }
            const updateData = {
                preference: preference
            };
            const pagoActualizado = await Pago.findByIdAndUpdate(id, updateData, { new: true });
            console.log("Pago actualizado correctamente");
            return pagoActualizado;
        } catch (error) {
            console.error("Error al actualizar el pago con la preferencia: ", error);
            throw new Error("Error al actualizar el pago con la preferencia: " + error.message);
        }
    }

    async borrarPagosFailure() {
        try {
            const pagos = await Pago.find({ estado: 'failure' });
            pagos.forEach(async pago => {
                await Pago.findByIdAndDelete(pago._id);
            });
            console.log("Pagos failure eliminados correctamente");
        } catch (error) {
            console.error("Error al borrar los pagos failure: ", error);
            throw new Error("Error al borrar los pagos failure: " + error.message);
        }
    }

    async obtenerPagosPorIdAlquiler(idAlquiler) {
        try {
            const cuotas = await Cuota.find({ alquiler: idAlquiler });
            const pagos = [];
            for (const cuota of cuotas) {
                const pagosCuota = await Pago.find({ cuota: cuota._id });
                pagosCuota.forEach(pago => {
                    pagos.push(pago);
                });
            }
            console.log("Pagos obtenidos correctamente");
            return pagos;
        } catch (error) {
            console.error("Error al obtener los pagos: ", error);
            throw new Error("Error al obtener los pagos: " + error.message);
        }
    }

    async buscarPagosPorInquilino(idInquilino) {
        try {
            const usuario = await Usuario.findById(idInquilino);
            if (!usuario) {
                throw new Error("Usuario no encontrado");
            }
            const alquileres = await Alquiler.find({ inquilino: idInquilino });
            const alquileresIds = alquileres.map(alquiler => alquiler._id);
            const cuotas = await Cuota.find({ alquiler: { $in: alquileresIds } });
            const cuotasIds = cuotas.map(cuota => cuota._id);
            const pagos = await Pago.find({ cuota: { $in: cuotasIds } });
            return pagos;
        } catch (error) {
            console.error("Error al buscar los pagos: ", error);
            throw new Error("Error al buscar los pagos: " + error.message);
        }
    }
}


module.exports = new PagoService();


