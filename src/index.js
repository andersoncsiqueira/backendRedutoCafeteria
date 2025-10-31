require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const { sequelize } = require('./models');
const apiRoutes = require('./routes');

const app = express();

app.use(express.json({ limit: '20mb' }));
// Middlewares básicos
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// arquivos públicos
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

// healthcheck simples
app.get('/api/ping', (_req, res) => res.json({ ok: true }));

// suas rotas principais

app.get('/api/ping', (_req, res) => res.json({ ok: true }));

app.use('/api', apiRoutes);

const PORT = process.env.PORT || 3001;

sequelize
  .sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Servidor rodando na porta ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ Erro ao sincronizar o Sequelize:', err);
    process.exit(1);
  });