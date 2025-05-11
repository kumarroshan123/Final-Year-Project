import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import db from '../../models'; 
import { JwtPayload } from 'jsonwebtoken';

type AsyncHandler = (req: Request, res: Response, next: NextFunction) => Promise<any>;

const User = (db as any).User;
// Extend Request type to include `user`
export interface AuthenticatedRequest extends Request {
  user?: typeof User;
}

export const protect:AsyncHandler = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    let token;
    // Prefer cookie first, fallback to Bearer token
    if (req.cookies?.jwt) {
      token = req.cookies.jwt;
    } else if (req.headers.authorization?.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({ message: 'Not logged in. Please login to get access.' });
    }

    // Decode token
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

    // Fetch user from DB
     if (!req.user) {
      const user = await User.findByPk(decoded.id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      req.user = user;
    }
    next();
  } catch (err) {
    console.error('Auth Middleware Error:', err);
    res.status(401).json({ message: 'Invalid token. Please login again.' });
  }
};
