import { Request, Response, NextFunction } from 'express';
import db from '../../models'; 
import { signToken } from '../utils/jwtUtils'; 
import bcrypt from 'bcryptjs'; 

const User = (db as any).User;

// Utility function to send token response (ensure JWT_SECRET is in your .env)
const createSendToken = (user: any, statusCode: number, res: Response) => {
  // Ensure user.id exists and is a number before signing
  if (typeof user.id !== 'number') {
      console.error('User ID is missing or not a number for token signing:', user);
      return res.status(500).json({ status: 'error', message: 'Internal server error: Cannot sign token.' });
  }
  const token = signToken(user.id);

  // Basic cookie options (consider making more secure for production)
  const cookieOptions = {
    expires: new Date(
      Date.now() + (parseInt(process.env.JWT_COOKIE_EXPIRES_IN || '90', 10) * 24 * 60 * 60 * 1000) // Default 90 days
    ),
    httpOnly: true, // Prevent XSS attacks
    secure: process.env.NODE_ENV === 'production', // Only send over HTTPS in production
  };

  res.cookie('jwt', token, cookieOptions);

  // Remove password from output
  const userOutput = { ...user.toJSON() }; // Clone user data
  delete userOutput.password;


  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user: userOutput,
    },
  });
};


// Register User Controller
export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email, password } = req.body;

    // Basic validation
    if (!name || !email || !password) {
      return res.status(400).json({ status: 'fail', message: 'Please provide name, email, and password' });
    }
     if (password.length < 8) {
       return res.status(400).json({ status: 'fail', message: 'Password must be at least 8 characters long' });
     }

    // Create new user (password hashing is handled by the model hook)
    const newUser = await User.create({
      name,
      email,
      password, // Pass the plain password, the hook will hash it
    });

    // Send JWT token
    createSendToken(newUser, 201, res);

  } catch (error: any) {
     // Handle potential errors (like duplicate email)
     if (error.name === 'SequelizeUniqueConstraintError') {
        return res.status(400).json({ status: 'fail', message: 'Email address already in use.' });
     }
     if (error.name === 'SequelizeValidationError') {
        const messages = error.errors.map((err: any) => err.message);
        return res.status(400).json({ status: 'fail', message: messages.join(', ') });
     }
     console.error("Registration Error:", error);
     res.status(500).json({ status: 'error', message: 'An error occurred during registration.' });
  }
};

// Login User Controller
export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    // 1) Check if email and password exist
    if (!email || !password) {
      return res.status(400).json({ status: 'fail', message: 'Please provide email and password' });
    }

    // 2) Check if user exists
    // Use the 'withPassword' scope to include the password field for comparison
    const user = await User.scope('withPassword').findOne({ where: { email } });

    // 3) Check user existence and password validity using bcrypt.compare
    if (!user || !(await bcrypt.compare(password, user.password))) { // Compare plain text password with hash
       return res.status(401).json({ status: 'fail', message: 'Incorrect email or password' });
    }

    // 4) If everything ok, send token to client
    createSendToken(user, 200, res);

  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ status: 'error', message: 'An error occurred during login.' });
  }
};
