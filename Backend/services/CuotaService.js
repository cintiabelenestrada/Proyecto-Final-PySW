const Cuota = require('../models/Cuota');
const PagoService = require('./PagoService');
const Alquiler = require('../models/Alquiler');

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

    async calcularInteres(cuota) {
        const alquiler = await Alquiler.findById(cuota.alquiler);
        const interesAnual = alquiler.interesAnual;

        // Interés diario basado en el interés anual
        const tasaInteresDiaria = interesAnual / 365 / 100;
        const fechaActual = new Date();
        const diasRetraso = (fechaActual - cuota.fechaVencimiento) / (1000 * 60 * 60 * 24);

        if (diasRetraso > 0) {
            const interes = cuota.montoRestante * tasaInteresDiaria * diasRetraso;
            return interes;
        }
        return 0;
    }

    async getCuotasById(idAlquiler) {
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

    async sePuedePagar(id, montoCuota, montoInteres) {
        try {
            const cuota = await Cuota.findById(id);
            if (!cuota) {
                throw new Error("La cuota no existe");
            }
            const cuotas = await Cuota.find({ alquiler: cuota.alquiler, estado: "Pendiente" }).sort({ fecha: 1 });
            if (cuotas[0]._id.toString() !== id.toString()) {
                throw new Error("Antes debe pagar las cuotas anteriores.");
            }
            const pagos = await PagoService.obtenerPagosPorIdCuota(id);
            let totalPagado = 0;
            pagos.forEach(pago => {
                totalPagado += pago.montoCuota + pago.montoInteres;
            });
            const interes = await this.calcularInteres(cuota);
            const montoRestanteConInteres = cuota.montoRestante + interes;
            if (!(totalPagado + montoCuota + montoInteres <= montoRestanteConInteres)) {
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

    async actualizarEstadoCuota(idCuota, idPago) {
        try {
            const pago = await PagoService.obtenerPagoPorId(idPago);
            if (pago.estado === 'success') {
                const cuota = await Cuota.findById(idCuota);
                cuota.montoRestante -= pago.montoCuota;
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
}

module.exports = new CuotaService();
