const googleSheetsService = require('../services/googleSheetsService');
const googleAuth = require('../config/googleAuth')

exports.confirmarPresenca = async (req, res) => {
  try {
    const { nome, email, acompanhantes = '' } = req.body;

    if (!nome || !email) {
      return res.status(400).json({ error: 'Nome e email são obrigatórios' });
    }

    const sheets = await googleAuth.getSheetsClient();

    const novaLinha = [[
      nome,
      email,
      'Confirmado',
      acompanhantes
    ]];

    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: 'Convidados!A:D', // intervalo onde vai adicionar (colunas de A a D)
      valueInputOption: 'USER_ENTERED',
      insertDataOption: 'INSERT_ROWS',
      requestBody: {
        values: novaLinha
      }
    });

    res.json({ mensagem: 'Presença confirmada!' });
  } catch (error) {
    console.error('Erro ao confirmar presença:', error);
    res.status(500).json({ error: 'Erro ao confirmar presença' });
  }
};

exports.listarPresencas = async (req, res) => {
  try {
    const presencas = await googleSheetsService.listarPresencas();
    res.json(presencas);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao listar presenças' });
  }
};
