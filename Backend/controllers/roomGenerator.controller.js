const axios = require('axios');
roomGeneratorCtrl = {};

roomGeneratorCtrl.startPrediction = async (req, res) => {
    const { imagen, prompt } = req.body;
    const body = {
      version: '854e8727697a057c525cdb45ab037f64ecca770a1769cc52287c2e56472a247b',
      input: {
        image: imagen,
        prompt: prompt,
        a_prompt: 'best quality, extremely detailed, photo from Pinterest, interior, cinematic photo, ultra-detailed, ultra-realistic, award-winning',
        n_prompt: 'longbody, lowres, bad anatomy, bad hands, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality',
      }
    };
  
    try {
      const response = await axios.post('http://localhost:3000/api/replicate/predictions', body);
      urlFull = response.data.urls.get;
      const parts = urlFull.split('/');
      const predictionId = parts[parts.length - 1];
      console.log ("Post correcto: " + predictionId);
      res.json(predictionId);
    } catch (error) {
      console.log ("Post incorrecto: " + error);
      res.status(500).json({ error: error.message });
    }
  };

roomGeneratorCtrl.getPredictionStatus = async (req, res) => {
    const id = req.params.id;
    console.log ("ID obtenido: " + id);
    try {
      const response = await axios.get(`http://localhost:3000/api/replicate/predictions/${id}`);
      console.log ("Respuesta obtenida: " + response);
      res.json(response.data);
    } catch (error) {
      console.log ("Error al obtener respuesta: " + error);
      res.status(500).json({ error: "Error al obtener respuesta" + error.message });
    }
  };

module.exports = roomGeneratorCtrl;
