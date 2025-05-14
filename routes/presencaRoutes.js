const express = require('express');
const router = express.Router();
const presencaController = require('../controllers/presencaController');

router.post('/', presencaController.confirmarPresenca);

module.exports = router;