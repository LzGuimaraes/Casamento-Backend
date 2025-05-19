const express = require('express');
const router = express.Router();
const presencaController = require('../controllers/presencaController');

// Rota POST para confirmar presença de convidados
// Recebe dados do convidado (nome, email, acompanhantes, mensagem, presente) e registra na planilha
router.post('/', presencaController.confirmarPresenca);

// Rota GET para listar todas as presenças confirmadas
// Retorna um array com todos os convidados que confirmaram presença
router.get('/', presencaController.listarPresencas); 

module.exports = router;