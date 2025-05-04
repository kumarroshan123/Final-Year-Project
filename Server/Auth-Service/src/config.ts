import dotenv from 'dotenv';
dotenv.config();

if (!process.env.JWT_SECRET) {
  throw new Error('Missing JWT_SECRET in environment variables');
}

export const PORT = process.env.PORT || 3000;
export const JWT_SECRET = process.env.JWT_SECRET as string;
export const DATABASE_URL = process.env.DATABASE_URL || '';
