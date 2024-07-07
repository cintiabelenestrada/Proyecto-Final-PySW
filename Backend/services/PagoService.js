const Pago = require('../models/Pago');
const Alquiler = require('../models/Alquiler');

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
            const pagos = await Pago.find({ cuota: idCuota });
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
    async actualizarEstadoPago(id, estado) {
        try {
            const pago = await Pago.findById(id);
            if (!pago) {
                throw new Error("Pago no encontrado");
            }
            const updateData = {
                estado: estado,
                fechaActualizacion: new Date()
            };
            const pagoActualizado = await Pago.findByIdAndUpdate (id, updateData , { new: true });
            console.log("Pago actualizado correctamente");
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
}

module.exports = new PagoService();


