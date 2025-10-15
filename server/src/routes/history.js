import express from 'express';
import { History } from '../models/History.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const items = await History.find({}).sort({ createdAt: -1 }).limit(500).lean();
    res.json(items);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;


