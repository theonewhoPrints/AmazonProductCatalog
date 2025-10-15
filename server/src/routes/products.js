import express from 'express';
import { Product } from '../models/Product.js';
import { History } from '../models/History.js';

const router = express.Router();

// Create single product (allows dynamic fields). Requires "Uniq Id" and "Product Name".
router.post('/', async (req, res) => {
  try {
    const body = req.body || {};
    if (!body['Uniq Id'] || !body['Product Name']) {
      return res.status(400).json({ error: 'Missing required fields: "Uniq Id" and "Product Name"' });
    }
    const created = await Product.create(body);
    await History.create({ action: 'create', uniqId: created['Uniq Id'], snapshot: created.toObject() });
    res.status(201).json(created);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Read/search products by arbitrary fields. Accepts query object in body or query string.
router.get('/', async (req, res) => {
  try {
    // Support both query params and JSON body for flexibility
    const filter = Object.keys(req.query || {}).length ? req.query : (req.body || {});
    // Convert empty strings to regex match anything? Better: ignore empty fields
    const cleaned = Object.fromEntries(Object.entries(filter).filter(([, v]) => v !== '' && v !== undefined && v !== null));
    const results = await Product.find(cleaned).sort({ createdAt: -1 }).lean();
    res.json(results);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get single by Uniq Id
router.get('/:uniqId', async (req, res) => {
  try {
    const doc = await Product.findOne({ 'Uniq Id': req.params.uniqId }).lean();
    if (!doc) return res.status(404).json({ error: 'Not found' });
    res.json(doc);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update single by Uniq Id. Prevent changing "Uniq Id".
router.put('/:uniqId', async (req, res) => {
  try {
    const updates = { ...(req.body || {}) };
    delete updates['Uniq Id'];
    const before = await Product.findOne({ 'Uniq Id': req.params.uniqId }).lean();
    if (!before) return res.status(404).json({ error: 'Not found' });
    const updated = await Product.findOneAndUpdate(
      { 'Uniq Id': req.params.uniqId },
      { $set: updates },
      { new: true, runValidators: false }
    );
    await History.create({ action: 'update', uniqId: req.params.uniqId, changes: updates, snapshot: updated.toObject() });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Bulk update by filter: body { filter: {...}, updates: {...} }
router.put('/', async (req, res) => {
  try {
    const { filter = {}, updates = {} } = req.body || {};
    delete updates['Uniq Id'];
    const result = await Product.updateMany(filter, { $set: updates });
    await History.create({ action: 'update', filter, changes: updates, message: `Matched ${result.matchedCount}, modified ${result.modifiedCount}` });
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete single by Uniq Id
router.delete('/:uniqId', async (req, res) => {
  try {
    const before = await Product.findOne({ 'Uniq Id': req.params.uniqId }).lean();
    const result = await Product.deleteOne({ 'Uniq Id': req.params.uniqId });
    if (result.deletedCount === 0) return res.status(404).json({ error: 'Not found' });
    await History.create({ action: 'delete', uniqId: req.params.uniqId, snapshot: before });
    res.json({ ok: true });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Bulk delete by filter: body { filter: {...} }
router.delete('/', async (req, res) => {
  try {
    const { filter = {} } = req.body || {};
    const toDelete = await Product.find(filter).lean();
    const result = await Product.deleteMany(filter);
    await History.create({ action: 'delete', filter, message: `Deleted ${result.deletedCount}`, snapshot: { docs: toDelete } });
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;


