const googleSheetsService = require('../services/googleSheetsService');

exports.confirmarPresenca = async (req, res) => {
  try {
    await googleSheetsService.registrarPresenca(req.body);
    res.json({ mensagem: 'Presença confirmada com sucesso!' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao confirmar presença' });
  }
};