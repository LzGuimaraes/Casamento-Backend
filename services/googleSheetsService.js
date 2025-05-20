const googleAuth = require('../config/googleAuth');

const sheetId = process.env.GOOGLE_SHEET_ID;

exports.getPresentes = async () => {
  try {
    const sheets = await googleAuth.getSheetsClient();
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId: sheetId,
      range: 'Presentes!A2:D',
    });
    
    if (!res.data.values || res.data.values.length === 0) {
      return [];
    }
    
    return res.data.values.map((row, i) => ({
      id: i + 1,
      nome: row[0],
      valor: row[1],
      status: row[2],
      reservadoPor: row[3],
    }));
  } catch (error) {
    console.error('Erro ao obter presentes:', error);
    throw error;
  }
};

exports.reservarPresente = async ({ id, nome, email, mensagem }) => {
  try {
    const sheets = await googleAuth.getSheetsClient();
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
  } catch (error) {
    console.error('Erro ao reservar presente:', error);
    throw error;
  }
};

exports.registrarPresenca = async ({ nome, email, acompanhantes, mensagem, presente }) => {
  try {
    // Adaptar os parâmetros para o formato esperado pelo googleAuth.registrarPresenca
    await googleAuth.registrarPresenca({
      nome,
      observacao: `Email: ${email}, Acompanhantes: ${acompanhantes}, Mensagem: ${mensagem}, Presente: ${presente}`
    });
  } catch (error) {
    console.error(`[registrarPresenca] Falha ao registrar presença de ${nome}:`, error);

    throw error;
  }
};

exports.cadastrarNovaPresenca = async ({ nome, email, status }) => {
  try {
    await googleAuth.cadastrarNovaPresenca({ NomeCompleto: nome, Email: email, Status: status });
  } catch (error) {
    console.error('Erro ao cadastrar nova presença:', error);
    throw error;
  }
};

exports.listarPresencas = async () => {
  try {
    return await googleAuth.listarPresencas();
  } catch (error) {
    console.error('Erro ao listar presenças:', error);
    throw error;
  }
};