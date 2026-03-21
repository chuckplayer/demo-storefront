import { Router } from 'express';
import db from '../db';

const router = Router();

// GET /api/products
// NOTE: Filtering and sorting logic is intentionally missing for demo
router.get('/', (_req, res, next) => {
  try {
    const products = db.prepare('SELECT * FROM products').all();
    res.json(products);
  } catch (err) {
    next(err);
  }
});

// GET /api/products/:id
router.get('/:id', (req, res, next) => {
  try {
    const product = db.prepare('SELECT * FROM products WHERE id = ?').get(req.params.id);
    if (!product) {
      res.status(404).json({ error: 'Product not found' });
      return;
    }
    res.json(product);
  } catch (err) {
    next(err);
  }
});

export default router;
