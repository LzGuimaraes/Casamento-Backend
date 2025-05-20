const googleSheetsService = require('../services/googleSheetsService');
const googleAuth = require('../config/googleAuth')

exports.confirmarPresenca = async (req, res) => {
  try {
    const { NomeCompleto, email, status, acompanhantes } = req.body;

    if (!NomeCompleto || !email || !status ) {
      return res.status(400).json({ error: 'NomeCompleto, email e status são obrigatórios' });
    }

    const sheets = await googleAuth.getSheetsClient();

    const novaLinha = [[
      NomeCompleto,
      email,
      status,
      acompanhantes
    ]];

    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: 'Convidados!A:D', 
      valueInputOption: 'USER_ENTERED',
      insertDataOption: 'INSERT_ROWS',
      requestBody: {
        values: novaLinha
      }
    });

    res.json({ mensagem: 'Presença confirmada!', values: novaLinha   });
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