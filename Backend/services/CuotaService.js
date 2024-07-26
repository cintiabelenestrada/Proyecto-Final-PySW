const Cuota = require('../models/Cuota');
const PagoService = require('./PagoService');
const Alquiler = require('../models/Alquiler');
const emailSender = require('./EmailSender');
const propietario = require('../models/Propietario');
const Usuario = require('../models/Usuario');

class CuotaService {

    async createCuota(cuota) {
        try {
            
            const newCuota = new Cuota({
                ...cuota,
                montoRestante: cuota.montoTotal
            });
            await newCuota.save();
            console.log("Cuota registrada correctamente");
            return newCuota;
        } catch (error) {
            console.log("Error al registrar la cuota " + error);
            throw new Error("Error al registrar la cuota" + error);
        }
    }

    async getCuotas() {
        try {
            const cuotas = await Cuota.find();
            console.log("Cuotas obtenidas correctamente");
            return cuotas;
        } catch (error) {
            console.log("Error al obtener las cuotas " + error);
            throw new Error("Error al obtener las cuotas" + error);
        }
    }

    async calcularInteres(cuota, montoAPagar) {
        const cuotaEncontrada = await Cuota.findById(cuota);
        const alquiler = await Alquiler.findById(cuotaEncontrada.alquiler);
        if (!alquiler) {
            throw new Error("El alquiler no existe");
        }
        const interesAnual = alquiler.interes;
        // Interés diario basado en el interés anual
        const tasaInteresDiaria = interesAnual / 365 / 100;
        const fechaActual = new Date();
        const diasRetraso = (fechaActual - cuota.fechaVencimiento) / (1000 * 60 * 60 * 24);

        if (diasRetraso > 0) {
            const interes = cuota.montoAPagar * tasaInteresDiaria * diasRetraso;
            return interes;
        }
        return 0;
    }

    async getCuotasByIdAlquiler(idAlquiler) {
        try {
            const cuotas = await Cuota.find({ alquiler: idAlquiler });
            
            const cuotasConInteres = await Promise.all(cuotas.map(async cuota => {
                const interes = await this.calcularInteres(cuota);
                return {
                    ...cuota.toObject(),
                    interes,
                    montoTotalConInteres: cuota.montoRestante + interes
                };
            }));
            console.log("Cuotas obtenidas correctamente");
            return cuotasConInteres;
        } catch (error) {
            console.log("Error al obtener las cuotas " + error);
            throw new Error("Error al obtener las cuotas " + error);
        }
    }

    async getCuotaById(id) {
        try {
            const cuota = await Cuota.findById(id);
            const interes = await this.calcularInteres(cuota);
            const cuotaConInteres = {
                ...cuota.toObject(),
                interes,
                montoTotalConInteres: cuota.montoRestante + interes
            };
            console.log("Cuota obtenida correctamente");
            return cuotaConInteres;
        } catch (error) {
            console.log("Error al obtener la cuota " + error);
            throw new Error("Error al obtener la cuota " + error);
        }
    }

    async sePuedePagar(idCuota, montoCuota) {
        try {
            const cuota = await Cuota.findById(idCuota);
            if (!cuota) {
                throw new Error("La cuota no existe");
            }
            const cuotas = await Cuota.find({ alquiler: cuota.alquiler, estado: "Pendiente" }).sort({ fecha: 1 });
            if (cuotas[0]._id.toString() !== idCuota) {
                throw new Error("Antes debe pagar las cuotas anteriores.");
            }
            const pagos = await PagoService.obtenerPagosPorIdCuota(idCuota);
            let totalPagado = 0;
            pagos.forEach(pago => {
                totalPagado += pago.montoPago;
            });
            const interes = await this.calcularInteres(cuota, montoCuota);
            const montoRestante = cuota.montoRestante;
            if (montoCuota + interes > montoRestante) {
                throw new Error("El monto a pagar es mayor al monto restante de la cuota con interés.");
            }
        } catch (error) {
            console.log("Error esta cuota no se puede pagar: " + error);
            throw new Error("Error esta cuota no se puede pagar: " + error);
        }
    }


    async pagarCuota(id, pago) {
        try {
            await this.sePuedePagar(id, pago.montoCuota, pago.montoInteres);
            const newPago = await PagoService.registrarPago({ ...pago, estado: 'pending' });
            return newPago;
        } catch (error) {
            console.log("Error al registrar el pago " + error);
            throw new Error("Error al registrar el pago" + error);
        }
    }

    async actualizarEstadoCuota(idPago) {
        try {
            const pago = await PagoService.obtenerPagoPorId(idPago);
            if (pago.status === 'success') {
                const cuota = await Cuota.findById(pago.cuota);
                cuota.montoRestante -= pago.montoPago;
                if (cuota.montoRestante <= 0) {
                    cuota.estado = 'Pagada';
                }
                await cuota.save();
            }
        } catch (error) {
            console.log("Error al actualizar el estado de la cuota " + error);
            throw new Error("Error al actualizar el estado de la cuota" + error);
        }
    }

    async enviarCorreosVencimientoCuotas() {
        try {
            const cuotas = await Cuota.find({ estado: 'Pendiente' });
            cuotas.forEach(async cuota => {
                const fechaActual = new Date();
                const diasRestantes = (cuota.fechaVencimiento - fechaActual) / (1000 * 60 * 60 * 24);
                if (diasRestantes <= 1) {
                    const alquiler = await Alquiler.findById(cuota.alquiler);
                    const inquilino = await Usuario.findById(alquiler.inquilino);
                    await emailSender.enviarAvisoDePagoPendiente(propietario.email, cuota);
                }
            });
        } catch (error) {
            console.log("Error al enviar correos de vencimiento de cuotas " + error);
            throw new Error("Error al enviar correos de vencimiento de cuotas" + error);
        }
    }

    async obtenerPagosPorIdCuota(idCuota) {
        try {
            const pagos = await PagoService.obtenerPagosPorIdCuota(idCuota);
            console.log("Pagos obtenidos correctamente");
            return pagos;
        } catch (error) {
            console.log("Error al obtener los pagos " + error);
            throw new Error("Error al obtener los pagos" + error);
        }
    }

    async obtenerCuotasPorIdUsuario(idUsuario){
        try{
            const Alquileres = await Alquiler.find({inquilino: idUsuario});
            console.log(JSON.stringify(Alquileres));
            const cuotas = await Promise.all(Alquileres.map(async alquiler => {
                return await Cuota.find({alquiler: alquiler._id});
            }));
            const cuotasAplanadas = cuotas.flat(); // Aplanar el arreglo de cuotas
            console.log("Cuotas obtenidas correctamente para el usuario: " + idUsuario);
            return cuotasAplanadas; // Devolver el arreglo aplanado
        }catch (error) {
            console.log("Error al obtener las cuotas " + error);
            throw new Error("Error al obtener las cuotas" + error);
        }
    }
    
}

module.exports = new CuotaService();
