const express = require('express');
const cors = require('cors');
require('dotenv').config();

const presenteRoutes = require('./routes/presenteRoutes');
const presencaRoutes = require('./routes/presencaRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/presentes', presenteRoutes);
app.use('/confirmar-presenca', presencaRoutes);

app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));