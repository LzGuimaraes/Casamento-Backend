const { google } = require('googleapis');
const fs = require('fs');
require('dotenv').config();

async function acessarPlanilha() {
  try {
    const auth = new google.auth.GoogleAuth({
      keyFile: 'credentials.json',
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const client = await auth.getClient();

    const sheets = google.sheets({ version: 'v4', auth: client });

    const spreadsheetId = process.env.GOOGLE_SHEET_ID;

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: 'Presentes!A1:D10', // Altere conforme sua aba/estrutura
    });

    const rows = response.data.values;

    if (!rows || rows.length === 0) {
      console.log('Nenhum dado encontrado na aba Presentes.');
    } else {
      console.log('Dados encontrados:');
      console.table(rows);
    }
  } catch (error) {
    console.error('Erro ao acessar a planilha:', error.message);
  }
}

acessarPlanilha();
