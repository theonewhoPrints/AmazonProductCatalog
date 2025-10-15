import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import productsRouter from './routes/products.js';
import historyRouter from './routes/history.js';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: '1mb' }));
app.use(morgan('dev'));

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017';
const DB_NAME = process.env.DB_NAME || 'demo';
const PORT = process.env.PORT || 4000;

await mongoose.connect(MONGO_URI, { dbName: DB_NAME });

app.get('/api/health', (req, res) => {
  res.json({ ok: true });
});

app.use('/api/products', productsRouter);
app.use('/api/history', historyRouter);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Serve SPA from ../client
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const clientDir = path.resolve(__dirname, '../../client');
app.use(express.static(clientDir));
app.get('*', (req, res) => {
  res.sendFile(path.join(clientDir, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});


