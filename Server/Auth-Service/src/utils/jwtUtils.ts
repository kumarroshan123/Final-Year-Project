import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
import { JWT_SECRET, JWT_EXPIRES_IN } from '../config';


if (!JWT_SECRET) {
  console.error('FATAL ERROR: JWT_SECRET is not defined in your .env file.');
  // Optionally exit if the secret is absolutely required for the app to function
  // process.exit(1);
}

/**
 * Signs a JWT token with the provided user ID.
 * @param id - The user ID to include in the token payload.
 * @returns The generated JWT token string.
 * @throws Error if JWT_SECRET is not defined.
 */
export const signToken = (id: number): string => {
  if (!JWT_SECRET) {
    // This check is redundant if the above check exits the process, but good for safety
    throw new Error('JWT_SECRET is not defined. Cannot sign token.');
  }
  const token = jwt.sign({ id }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });
  return token;
};


export const verifyToken = (token: string): any => {
  if (!JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined. Cannot verify token.');
  }
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    // Handle specific JWT errors like TokenExpiredError, JsonWebTokenError
    console.error("JWT Verification Error:", error);
    throw error; // Re-throw or handle as needed
  }
};
