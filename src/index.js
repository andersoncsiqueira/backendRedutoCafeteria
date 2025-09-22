require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
// const { sequelize } = require('./models'); // se usa Sequelize, deixe isso ativo
const apiRoutes = require('./routes');       // suas rotas (products, categories, uploads)

const app = express();

// middlewares
app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ extended: true }));

// estáticos de upload (MESMA pasta do multer)
const UPLOADS_DIR = path.resolve(process.cwd(), 'uploads');
app.use('/uploads', express.static(UPLOADS_DIR));

// healthcheck
app.get('/api/ping', (_req, res) => res.json({ ok: true }));

// rotas
app.use('/api', apiRoutes);

const PORT = process.env.PORT || 3001;

// Se tiver Sequelize, descomente o sync. Caso contrário, só starta o servidor.
app.listen(PORT, () => {
  console.log(`🚀 API ouvindo em http://localhost:${PORT}`);
});

// // Com Sequelize:
// sequelize.sync().then(() => {
//   app.listen(PORT, () => console.log(`🚀 API ouvindo em http://localhost:${PORT}`));
// }).catch((err) => {
//   console.error('❌ Sequelize sync failed:', err);
//   process.exit(1);
// });