const express = require('express');
const router = express.Router();
const presenteController = require('../controllers/presenteController');

router.get('/', presenteController.getPresentes);

router.post('/', presenteController.addPresent);

router.patch('/status', presenteController.updateStatus);

module.exports = router;
