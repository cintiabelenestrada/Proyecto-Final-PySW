const nodemailer = require('nodemailer');
const QRCode = require('qrcode');
const Cuota = require('../models/Cuota');

const hostFront = 'http://localhost:4200';

class EmailSender {
    constructor() {
        this.transporter = nodemailer.createTransport({
            host : 'smtp.gmail.com',
            port : 587,
            secure : false,
            auth : {
                user : 'poo2023correo@gmail.com',
                pass : process.env.MAIL_PASSWORD
            }
        });
    }

    async enviarComprobanteDePago(email, pago) {
        // Generar QR
        const qrDataURL = await QRCode.toDataURL(hostFront + '/dashboard/cuotas/' + pago.cuota +'/pago/success');
        const fechaFormateada = pago.fechaActualizacion.toLocaleString('es-AR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        }).replace(/(\d{2})\/(\d{2})\/(\d{4}), (\d{2}):(\d{2})/, '$1/$2/$3 $4:$5');
        // Configurar las opciones del correo electrónico
        let mailOptions = {
            from: 'INMOBILIARIA XYZ <poo2023correo@gmail.com>',
            to: email,
            subject: 'Comprobante de Pago',
            html: `<h1>Comprobante de Pago</h1>
            <p>Detalles del pago:</p>
            <ul>
                <li>Monto: $${pago.montoPago}</li>
                <li>Monto Interes: $${pago.montoInteres}</li>
                <li>Fecha Aprobacion: ${fechaFormateada}</li>
            </ul>
            <p>Adjunto encontrará el código QR que puede escanear para más detalles.</p>
            <p>En caso de no poder ver la imagen, haga click <a href="${qrDataURL}">aquí</a>.</p>`,
            attachments: [{
                filename: 'codigoQR.png',
                path: qrDataURL,
                cid: 'codigoQR' // Puede usar el cid en el campo html si desea referenciar la imagen incrustada
            }]
        };
    
        // Enviar el correo electrónico
        this.transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Correo enviado: ' + info.response);
            }
        });
    }
    
    async enviarAvisoDePagoPendiente(email, cuota ) {
        // Configurar las opciones del correo electrónico
        const fechaFormateada = pago.fechaActualizacion.toLocaleString('es-AR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        }).replace(/(\d{2})\/(\d{2})\/(\d{4}), (\d{2}):(\d{2})/, '$1/$2/$3 $4:$5');

        let mailOptions = {
            from: 'INMOBILIARIA XYZ <poo2023correo@gmail.com>',
            to: email,
            subject: 'Aviso de Pago Pendiente',
            html: `<h1>Aviso de Pago Pendiente</h1>
            <p>Detalles de la cuota:</p>
            <ul>
                <li>Monto Total: $${cuota.monto}</li>
                <li>Monto Restante: $${cuota.montoRestante}</li>
                <li>Fecha de vencimiento: ${fechaFormateada}</li>
            </ul>
            <p>Por favor, realice el pago de la cuota pendiente lo antes posible.</p>`,
        };
        try {
            // Enviar el correo electrónico
            let info = await this.transporter.sendMail(mailOptions);
            console.log('Correo enviado: %s', info.messageId);
        }catch (error) {
            console.error('Error al enviar el correo electrónico: ', error);
            throw new Error('Error al enviar el correo electrónico: ' + error.message);
        }
    }
}

module.exports = new EmailSender();