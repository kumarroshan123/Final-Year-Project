import { RequestHandler ,Request, Response, NextFunction } from 'express';
import db from '../../models'; 

const User = (db as any).User;
const Transaction = (db as any).Transaction;

type AsyncHandler = (req: Request, res: Response, next: NextFunction) => Promise<any>;

export const storeRows:AsyncHandler  = async (req, res ,next) => {
  try {
    const { rows } = req.body;

    // Validate input
    if (!Array.isArray(rows) || rows.length === 0) {
      return res.status(400).json({ error: 'No rows provided' });
    }

    // Ensure all rows have a valid UserId
    const userIds = [...new Set(rows.map((row) => row.UserId))];
    const users = await User.findAll({ where: { id: userIds } });

    if (users.length !== userIds.length) {
      return res.status(400).json({ error: 'Invalid UserId(s) provided' });
    }

    // Bulk insert rows into the Transaction table
    const insertedRows = await Transaction.bulkCreate(rows);

    res.status(201).json({
      message: 'Rows stored successfully',
      data: insertedRows,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error', details: (err as Error)?.message });
  }
};