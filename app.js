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

app.listen(3001, () => console.log('Servidor rodando na porta 3001'));