const { google } = require('googleapis');
const path = require('path');
const fs = require('fs');

const credentialsPath = path.join(__dirname, '../credentials.json');

if (process.env.GOOGLE_CREDENTIALS_BASE64 && !fs.existsSync(credentialsPath)) {
  const decoded = Buffer.from(process.env.GOOGLE_CREDENTIALS_BASE64, 'base64').toString('utf8');
  fs.writeFileSync(credentialsPath, decoded);
}

async function getSheetsClient() {
  const auth = new google.auth.GoogleAuth({
    keyFile: credentialsPath,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const client = await auth.getClient();
  const sheets = google.sheets({ version: 'v4', auth: client });
  return sheets;
}

const spreadsheetId = process.env.GOOGLE_SHEET_ID;

async function registrarPresenca({ nome, status }) {
  const sheets = await getSheetsClient();

  const range = 'Convidados!A2:C';
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range,
  });

  const rows = response.data.values;

  if (!rows || rows.length === 0) {
    throw new Error('Nenhum convidado encontrado');
  }

  const rowIndex = rows.findIndex(row => row[0]?.toLowerCase() === nome.toLowerCase());

  if (rowIndex === -1) {
  throw new Error(`Convidado com nome "${nome}" não encontrado.`);
}

  const rowNumber = rowIndex + 2; 

  const updateRange = `Convidados!B${rowNumber}:C${rowNumber}`; 
  const values = [[status, '']];

  await sheets.spreadsheets.values.update({
    spreadsheetId,
    range: updateRange,
    valueInputOption: 'USER_ENTERED',
    requestBody: {
      values,
    },
  });
}

// LISTAR PRESENÇAS (retorna todos os convidados)
async function listarPresencas() {
  const sheets = await getSheetsClient();
  const range = 'Convidados!A2:D';

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range,
  });

  const rows = response.data.values;

  if (!rows || rows.length === 0) {
    return [];
  }

  return rows.map(([NomeCompleto, Email, Status, Acompanhantes]) => ({
  NomeCompleto,
  Email,
  Status,
  Acompanhantes: Acompanhantes
}));
}

// CADASTRAR NOVA PRESENÇA (adiciona nova linha de convidado)
async function cadastrarNovaPresenca({ NomeCompleto, Email, Status, Acompanhantes }) {
  const sheets = await getSheetsClient();
  const values = [[NomeCompleto, Email, Status, Acompanhantes]];
  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: 'Convidados!A2:D',
    valueInputOption: 'USER_ENTERED',
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
