import { Router } from 'express';
import db from '../db';

const router = Router();

// POST /api/orders
// NOTE: No validation intentionally for demo
// NOTE: Stock quantity is tracked in DB but never decremented here
router.post('/', (req, res, next) => {
  try {
    const { customer_email, items } = req.body as {
      customer_email: string;
      items: { product_id: number; quantity: number; price_at_purchase: number }[];
    };

    db.exec('BEGIN');
    try {
      const result = db
        .prepare('INSERT INTO orders (customer_email) VALUES (?)')
        .run(customer_email);
      const orderId = Number(result.lastInsertRowid);

      const insertItem = db.prepare(
        'INSERT INTO order_items (order_id, product_id, quantity, price_at_purchase) VALUES (?, ?, ?, ?)'
      );
      for (const item of items) {
        insertItem.run(orderId, item.product_id, item.quantity, item.price_at_purchase);
      }

      db.exec('COMMIT');
      const order = db.prepare('SELECT * FROM orders WHERE id = ?').get(orderId);
      res.status(201).json(order);
    } catch (err) {
      db.exec('ROLLBACK');
      throw err;
    }
  } catch (err) {
    next(err);
  }
});

// GET /api/orders/:id
router.get('/:id', (req, res, next) => {
  try {
    const order = db.prepare('SELECT * FROM orders WHERE id = ?').get(req.params.id);
    if (!order) {
      res.status(404).json({ error: 'Order not found' });
      return;
    }
    const items = db
      .prepare(
        `SELECT oi.*, p.name, p.image_url, p.category
         FROM order_items oi
         JOIN products p ON p.id = oi.product_id
         WHERE oi.order_id = ?`
      )
      .all(req.params.id);
    res.json({ ...(order as object), items });
  } catch (err) {
    next(err);
  }
});

export default router;
