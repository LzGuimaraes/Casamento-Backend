const express = require('express');
const router = express.Router();
const presenteController = require('../controllers/presenteController');

// Rota GET para listar todos os presentes disponíveis
// Retorna um array com todos os presentes cadastrados na planilha
router.get('/', presenteController.getPresentes);

// Rota POST para adicionar um novo presente à lista
// Recebe nome, presente e valor, e adiciona à planilha com status 'pendente'
router.post('/', presenteController.addPresent);

// Rota PATCH para atualizar o status de um presente
// Recebe rowIndex e status, e atualiza o status do presente na planilha
router.patch('/status', presenteController.updateStatus);


module.exports = router;
