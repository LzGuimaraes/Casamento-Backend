const { google } = require('googleapis');
const auth = require('../config/googleAuth');
const dayjs = require('dayjs');

const sheets = google.sheets({ version: 'v4', auth });
const sheetId = process.env.GOOGLE_SHEET_ID;

exports.getPresentes = async () => {
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: sheetId,
    range: 'Presentes!A2:D',
  });
  return res.data.values.map((row, i) => ({
    id: i + 1,
    nome: row[0],
    valor: row[1],
    status: row[2],
    reservadoPor: row[3],
  }));
};

exports.reservarPresente = async ({ id, nome, email, mensagem }) => {
  const linha = parseInt(id) + 1;
  await sheets.spreadsheets.values.update({
    spreadsheetId: sheetId,
    range: `Presentes!C${linha}:D${linha}`,
    valueInputOption: 'RAW',
    requestBody: {
      values: [['reservado', `${nome} - ${email} - ${mensagem}`]]
    }
  });

  return { status: 'ok', pix: { valor: 'chavepix@exemplo.com.br' } };
};

exports.registrarPresenca = async ({ nome, email, acompanhantes, mensagem }) => {
  await sheets.spreadsheets.values.append({
    spreadsheetId: sheetId,
    range: 'Presencas!A2:D2',
    valueInputOption: 'RAW',
    requestBody: {
      values: [[
        nome,
        email,
        acompanhantes,
        mensagem || ''
      ]],
    },
  });
};