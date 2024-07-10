const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const alquiler = require('../models/Alquiler');
const app = express();

app.use(bodyParser.json());

const PAGE_ACCESS_TOKEN_PAGE = 'EAAOFlmBqs4oBOZBhsQF2EoMNwbzzks2Rb3SWrrOi8972B5O7l1Itzr1wFjbr46NtBLA1lHWy5CJPLujDVeNtzkWy4wrAZB8WG2fhruOzFNadgsPLIdi3Fxq76BYLH5VhsCuZAxBNHIyfJNTGsSPTP9Ubm2kF1ggdzMSLqPTHxdMLz9YHTrcUdKm1GU751MqoPeKh6wo';


class PostFacebook {
    async publish(alquiler) {
        const message = `Piedra Inmobiliaria Alquila \n Hermosa propiedad \n $${alquiler.costoAlquiler} \n ${alquiler.local.descripcion}`;
        const url = alquiler.local.pathimagen; // Asegúrate de que esta es una URL directa a una imagen

        try {
            const response = await axios.post(
                `https://graph.facebook.com/394696443718113/photos?access_token=${PAGE_ACCESS_TOKEN_PAGE}`,
                {
                    message: message,
                    url: url
                }
            );
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.error(error.message);
            throw new Error('Error al publicar en Facebook');
        }
    }

    async deletePublish(id){
        try {
            const response = await axios.delete(
                `https://graph.facebook.com/${id}?access_token=${PAGE_ACCESS_TOKEN_PAGE}`
            );
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.error(error.message);
            throw new Error('Error al eliminar la publicación en Facebook');
        }
    }

}





module.exports = new PostFacebook();
