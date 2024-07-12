const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const local = require('../models/Local');
const app = express();

app.use(bodyParser.json());

const PAGE_ACCESS_TOKEN_PAGE = 'EAAOFlmBqs4oBOZBhsQF2EoMNwbzzks2Rb3SWrrOi8972B5O7l1Itzr1wFjbr46NtBLA1lHWy5CJPLujDVeNtzkWy4wrAZB8WG2fhruOzFNadgsPLIdi3Fxq76BYLH5VhsCuZAxBNHIyfJNTGsSPTP9Ubm2kF1ggdzMSLqPTHxdMLz9YHTrcUdKm1GU751MqoPeKh6wo';
/*                              EAAOFlmBqs4oBOZBhsQF2EoMNwbzzks2Rb3SWrrOi8972B5O7l1Itzr1wFjbr46NtBLA1lHWy5CJPLujDVeNtzkWy4wrAZB8WG2fhruOzFNadgsPLIdi3Fxq76BYLH5VhsCuZAxBNHIyfJNTGsSPTP9Ubm2kF1ggdzMSLqPTHxdMLz9YHTrcUdKm1GU751MqoPeKh6wo */
class PostFacebook {
    async publish(local) {
        const message = `Piedra Inmobiliaria Alquila \n Hermosa propiedad \n $${local.direccion} \n ${local.descripcion}`;
        const url = local.pathimagen;
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

    async deletePublish(postId){
        try {
            const response = await axios.delete(
                `https://graph.facebook.com/${postId}?access_token=${PAGE_ACCESS_TOKEN_PAGE}`
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
