# Auth-Service for LedgerSense

This is the authentication microservice for LedgerSense, built with Node.js, Express, TypeScript, and Sequelize(Postgres).

## Features

- User registration and login with JWT authentication
- Secure password hashing
- User profile management
- Cookie-based authentication

## Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [PostgreSQL](https://www.postgresql.org/) or your preferred SQL database

## Getting Started

### 1. Clone the repository:

### 2. Install dependencies:
```bash
npm install
# or
yarn install
```

### 3. Configure the environment variables:
PORT=5001
DATABASE_URL=your_database_connection_string
JWT_SECRET=your_jwt_secret
NODE_ENV=development

### 4. Run the migrations:
```bash
npx sequelize-cli db:migrate
```
### 5. Start the development server:
```bash
npm run dev
# or
yarn dev
```

The server will start running at  URL_ADDRESS:5001.


Check API documentation for more details.