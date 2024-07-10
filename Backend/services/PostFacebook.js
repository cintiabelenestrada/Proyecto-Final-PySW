const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const alquiler = require('../models/Alquiler');
const app = express();

app.use(bodyParser.json());

const PAGE_ACCESS_TOKEN_APP = 'EAAOFlmBqs4oBOygo8vfbFJxIYCe11WVoZBZAutKcVD6tk8cotZCfhSACr4aCP69F1dWRNZCqOsgSZAFeYYv7IOglDnDwFsbOZA50AFTkFxpNPangUIOuyfD1AUAUkTPzrObeU9b8w3AIhvs6ZBX7fZBluF8GrYkcfyg1hEReHzsxGFMw4AZC4g4gW1UZAdij01lVD9';
const PAGE_ACCESS_TOKEN_PAGE = 'EAAOFlmBqs4oBOZBhsQF2EoMNwbzzks2Rb3SWrrOi8972B5O7l1Itzr1wFjbr46NtBLA1lHWy5CJPLujDVeNtzkWy4wrAZB8WG2fhruOzFNadgsPLIdi3Fxq76BYLH5VhsCuZAxBNHIyfJNTGsSPTP9Ubm2kF1ggdzMSLqPTHxdMLz9YHTrcUdKm1GU751MqoPeKh6wo';


class PostFacebook {
    async publish(alquiler) {
        const message = `Piedra Inmobiliaria Alquila \n Hermosa propiedad  \n $
         ${alquiler.costoAlquiler}        `;
        const url = alquiler.local.url;

        try {
            const response = await axios.post(
                `https://graph.facebook.com/394696443718113/photos?access_token=${PAGE_ACCESS_TOKEN_PAGE}`,
                {
                    message: message,
                    url: url
                },
            );
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.error(error.message);
            throw new Error('Error al publicar en Facebook');
        }
    }
}

module.exports = new PostFacebookService();

/* app.post('/publish', async (req, res) => {
    const { message } = req.body;

    try {
        const response = await axios.post(
            `https://graph.facebook.com/photos`,
            { message },
            {
                params: { access_token: PAGE_ACCESS_TOKEN },
            }
        );
        res.status(200).json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}); */