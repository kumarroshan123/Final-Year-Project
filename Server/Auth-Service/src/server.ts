import dotenv from 'dotenv';
dotenv.config();
import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { sequelize } from '../models';
import authRoutes from './routes/authRoutes';
import cookieParser from 'cookie-parser';

const app: Express = express();
const port = process.env.PORT || 5001;

// Middleware
app.use(cors()); // Enable CORS (configure origins for production)
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(cookieParser());

app.use('/api/auth', authRoutes);

// Test Database Connection using the imported sequelize instance
const checkDbConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    // Optionally exit if DB connection fails on start
    // process.exit(1);
  }
};
checkDbConnection();

// Simple Route for Testing
app.get('/', (req: Request, res: Response) => {
  res.send('Auth Service (PostgreSQL) is running!');
});

// Placeholder for Auth Routes
// import authRoutes from './routes/auth';
// app.use('/api/auth', authRoutes);

// Global Error Handler (Basic Example)
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});


app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});