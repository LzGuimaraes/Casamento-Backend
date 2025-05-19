const { google } = require('googleapis');
const path = require('path');

async function getSheetsClient() {
  const auth = new google.auth.GoogleAuth({
    keyFile: path.join(__dirname, '../credentials.json'),
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const client = await auth.getClient();
  const sheets = google.sheets({ version: 'v4', auth: client });
  return sheets;
}

const spreadsheetId = process.env.GOOGLE_SHEET_ID;

// ✅ REGISTRAR PRESENÇA (atualiza linha de quem confirmou)
async function registrarPresenca({ nome, observacao }) {
  const sheets = await getSheetsClient();

  // Pega todas as linhas da aba Convidados
  const range = 'Convidados!A2:C';
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range,
  });

  const rows = response.data.values;

  if (!rows || rows.length === 0) {
    throw new Error('Nenhum convidado encontrado');
  }

  // Procura a linha com o nome correspondente
  const rowIndex = rows.findIndex(row => row[0]?.toLowerCase() === nome.toLowerCase());

  if (rowIndex === -1) {
    throw new Error('Convidado não encontrado');
  }

  const rowNumber = rowIndex + 2; // +2 porque começa da linha 2 na planilha

  const updateRange = `Convidados!B${rowNumber}:C${rowNumber}`; // Presença e Observação
  const values = [['Confirmado', observacao || '']];

  await sheets.spreadsheets.values.update({
    spreadsheetId,
    range: updateRange,
    valueInputOption: 'RAW',
    requestBody: {
      values,
    },
  });
}

// LISTAR PRESENÇAS (retorna todos os convidados)
async function listarPresencas() {
  const sheets = await getSheetsClient();
  const range = 'Convidados!A2:C';

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range,
  });

  const rows = response.data.values;

  if (!rows || rows.length === 0) {
    return [];
  }

  return rows.map(([nome, presenca, observacao]) => ({
    nome,
    presenca,
    observacao,
  }));
}

// CADASTRAR NOVA PRESENÇA (adiciona nova linha de convidado)
async function cadastrarNovaPresenca({ nome, observacao }) {
  const sheets = await getSheetsClient();
  const range = 'Convidados!A2:C';
  const values = [[nome, '', observacao || '']];
  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range,
    valueInputOption: 'RAW',
    insertDataOption: 'INSERT_ROWS',
    requestBody: { values },
  });
}

module.exports = {
  getSheetsClient,
  registrarPresenca,
  listarPresencas,
  cadastrarNovaPresenca,
};
