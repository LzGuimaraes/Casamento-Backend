const express = require('express');
const router = express.Router();
const presencaController = require('../controllers/presencaController');

router.post('/', presencaController.confirmarPresenca);

router.get('/', presencaController.listarPresencas); 

router.delete('/confirmar-presenca/:nome', presencaController.deletarPresenca);

module.exports = router;