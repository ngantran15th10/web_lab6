# Lab 6 - JWT Authentication & RabbitMQ

JWT authentication system with role-based access control and RabbitMQ messaging.

## Features

**Exercise 1:** JWT Authentication with login tracking (login_time, login_address)  
**Exercise 2:** Role-based access control (admin/user)  
**Exercise 3:** RabbitMQ messaging (2 producers, 1 consumer)

## Installation

```bash
npm install
```

## Configuration

Create `.env` file:
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=lab6_db
JWT_SECRET=your_secret_key
PORT=3000
RABBITMQ_URL=amqp://localhost
```

## Database Setup

```bash
node setup-db.js
```

Or run `database/schema.sql` in MySQL.

## Run Application

**Server:**
```bash
npm start
```

**RabbitMQ:**
```bash
# Terminal 1
npm run consumer

# Terminal 2
npm run producer1

# Terminal 3
npm run producer2
```

## API Endpoints

- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login (returns JWT)
- `GET /api/auth/profile` - Get profile (requires JWT)
- `GET /api/admin/dashboard` - Admin only (requires JWT + admin role)

## Technologies

- Express.js
- JWT (jsonwebtoken)
- MySQL (mysql2)
- RabbitMQ (amqplib)
- bcryptjs

