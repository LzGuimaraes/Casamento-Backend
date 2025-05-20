const { google } = require('googleapis');
const path = require('path');

async function getPresentes(req, res) {
  try {
    console.log('Iniciando leitura dos presentes...');

    const auth = new google.auth.GoogleAuth({
      keyFile: path.join(__dirname, '../credentials.json'),
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const client = await auth.getClient();
    const sheets = google.sheets({ version: 'v4', auth: client });

    const spreadsheetId = process.env.GOOGLE_SHEET_ID;
    const range = 'Presentes!A2:D';

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });

    const rows = response.data.values;

    if (!rows || rows.length === 0) {
      console.log('Nenhum dado encontrado.');
      return res.json([]);
    }

    console.log('Presentes encontrados:', rows.length);
    res.json(rows);
  } catch (error) {
    console.error('Erro no backend ao buscar presentes:', error);
    res.status(500).json({ error: 'Erro ao buscar presentes' });
  }
}

async function updateStatus(req, res) {
  try {
    const { rowIndex, status } = req.body;

    const auth = new google.auth.GoogleAuth({
      keyFile: path.join(__dirname, '../credentials.json'),
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const client = await auth.getClient();
    const sheets = google.sheets({ version: 'v4', auth: client });

    const spreadsheetId = process.env.GOOGLE_SHEET_ID;
    const range = `Presentes!D${rowIndex + 2}`; // +2 por conta do cabeçalho e índice base 0

    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range,
      valueInputOption: 'RAW',
      resource: {
        values: [[status]],
      },
    });

    res.status(200).json({ message: 'Status atualizado com sucesso' });
  } catch (error) {
    console.error('Erro ao atualizar status:', error);
    res.status(500).json({ error: 'Erro ao atualizar status' });
  }
}


async function addPresent(req, res) {
  try {
    const { nome, presente, valor, status } = req.body;
    

    if (!nome || !presente || !valor) {
      return res.status(400).json({ error: 'Campos obrigatórios: nome, presente, valor' });
    }

    const auth = new google.auth.GoogleAuth({
      keyFile: path.join(__dirname, '../credentials.json'),
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const client = await auth.getClient();
    const sheets = google.sheets({ version: 'v4', auth: client });

    const spreadsheetId = process.env.GOOGLE_SHEET_ID;
    const range = 'Presentes!A2:D';

    // Coluna D = status reservado (ex: "pendente")
    const values = [[nome, presente, valor, status || 'pendente']];

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range,
      valueInputOption: 'RAW',
      resource: {
        values,
      },
    });

    res.status(201).json({ message: 'Presente adicionado com sucesso!',
      presente: { nome, presente, valor, status: status || 'pendente' }
      });
  } catch (error) {
    console.error('Erro ao adicionar presente:', error);
    res.status(500).json({ error: 'Erro ao adicionar presente' });
  }
}

module.exports = {
  getPresentes,
  addPresent,
  updateStatus
};
