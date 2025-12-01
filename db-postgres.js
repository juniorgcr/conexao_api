import { Pool } from 'pg';

let pool;

function getPool() {
  if (!pool) {
    const connectionString = process.env.DATABASE_URL || process.env.PG_CONNECTION_STRING || null;
    pool = new Pool(connectionString ? { connectionString } : undefined);
  }
  return pool;
}

async function createOrderDb(o) {
  const client = await getPool().connect();
  try {
    await client.query('BEGIN');
    await client.query(
      'INSERT INTO orders(orderId, value, creationDate) VALUES($1,$2,$3)',
      [o.orderId, o.value, o.creationDate]
    );
    const insertItemText = 'INSERT INTO items(orderId, productId, quantity, price) VALUES($1,$2,$3,$4)';
    for (const it of o.items) {
      await client.query(insertItemText, [o.orderId, it.productId, it.quantity, it.price]);
    }
    await client.query('COMMIT');
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
}

async function getOrderDb(orderId) {
  const client = await getPool().connect();
  try {
    const orderRes = await client.query('SELECT orderid AS "orderId", value, creationdate AS "creationDate" FROM orders WHERE orderid = $1', [orderId]);
    if (orderRes.rowCount === 0) return null;
    const order = orderRes.rows[0];
    const itemsRes = await client.query('SELECT productid AS "productId", quantity, price FROM items WHERE orderid = $1', [orderId]);
    order.items = itemsRes.rows.map(r => ({ productId: Number(r.productId), quantity: r.quantity, price: Number(r.price) }));
    return order;
  } finally {
    client.release();
  }
}

async function listOrdersDb() {
  const client = await getPool().connect();
  try {
    const ordersRes = await client.query('SELECT orderid AS "orderId", value, creationdate AS "creationDate" FROM orders ORDER BY creationdate DESC');
    const orders = [];
    for (const row of ordersRes.rows) {
      const itemsRes = await client.query('SELECT productid AS "productId", quantity, price FROM items WHERE orderid = $1', [row.orderId]);
      orders.push({ orderId: row.orderId, value: Number(row.value), creationDate: row.creationDate, items: itemsRes.rows.map(r => ({ productId: Number(r.productId), quantity: r.quantity, price: Number(r.price) })) });
    }
    return orders;
  } finally {
    client.release();
  }
}

async function updateOrderDb(orderId, o) {
  const client = await getPool().connect();
  try {
    await client.query('BEGIN');
    const upd = await client.query('UPDATE orders SET value=$1, creationdate=$2 WHERE orderid=$3 RETURNING orderid', [o.value, o.creationDate, orderId]);
    if (upd.rowCount === 0) {
      await client.query('ROLLBACK');
      return null;
    }
    await client.query('DELETE FROM items WHERE orderid = $1', [orderId]);
    const insertItemText = 'INSERT INTO items(orderId, productId, quantity, price) VALUES($1,$2,$3,$4)';
    for (const it of o.items) {
      await client.query(insertItemText, [orderId, it.productId, it.quantity, it.price]);
    }
    await client.query('COMMIT');
    return await getOrderDb(orderId);
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
}

async function deleteOrderDb(orderId) {
  const client = await getPool().connect();
  try {
    await client.query('BEGIN');
    const order = await getOrderDb(orderId);
    if (!order) {
      await client.query('ROLLBACK');
      return null;
    }
    await client.query('DELETE FROM items WHERE orderid = $1', [orderId]);
    await client.query('DELETE FROM orders WHERE orderid = $1', [orderId]);
    await client.query('COMMIT');
    return order;
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
}

export { createOrderDb, getOrderDb, listOrdersDb, updateOrderDb, deleteOrderDb };
