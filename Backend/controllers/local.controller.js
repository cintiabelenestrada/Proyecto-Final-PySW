const Local = require('../models/Local');
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
module.exports = localCtrl;