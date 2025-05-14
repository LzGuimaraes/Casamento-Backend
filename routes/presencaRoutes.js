const express = require('express');
const router = express.Router();
const presencaController = require('../controllers/presencaController');
const presenteController = require('../controllers/presenteController');

router.post('/', presencaController.confirmarPresenca);
router.post('/', presenteController.addPresent);

module.exports = router;