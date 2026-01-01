# Lab 6 - JWT Authentication with Roles & RabbitMQ Messaging

Complete implementation of 3 exercises: JWT authentication with login tracking, role-based access control, and RabbitMQ messaging system.

## Prerequisites

- Node.js installed
- MySQL server running (port 3306)
- RabbitMQ server running (port 5672)

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Copy `.env.example` to `.env` and update with your credentials:

```bash
cp .env.example .env
```

Edit `.env`:
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=lab6_db
JWT_SECRET=your_secret_key
PORT=3000
RABBITMQ_URL=amqp://localhost
```

### 3. Setup Database

Run the SQL schema file in MySQL:

```bash
mysql -u root -p < database/schema.sql
```

Or manually:
```sql
source database/schema.sql;
```

### 4. Create Admin User (Optional)

To test admin endpoints, assign admin role to a user:

```sql
USE lab6_db;
-- After registering a user, get their ID and run:
INSERT INTO user_roles (user_id, role_id) VALUES (1, 1);
```

## Running the Application

### Start the Server

```bash
npm start
```

Server will run on `http://localhost:3000`

### RabbitMQ Components

**Start Consumer (Terminal 1):**
```bash
npm run consumer
```

**Send message from Producer 1 (Terminal 2):**
```bash
npm run producer1
```

**Send message from Producer 2 (Terminal 3):**
```bash
npm run producer2
```

## API Endpoints

### Exercise 1: JWT Authentication

#### Register User
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d "{\"username\":\"testuser\",\"email\":\"test@example.com\",\"password\":\"password123\"}"
```

#### Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"test@example.com\",\"password\":\"password123\"}"
```

Response includes JWT token and login_time, login_address.

#### Get Profile (Protected)
```bash
curl -X GET http://localhost:3000/api/auth/profile \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Exercise 2: Role-Based Access Control

#### Admin Dashboard (Admin Only)
```bash
curl -X GET http://localhost:3000/api/admin/dashboard \
  -H "Authorization: Bearer ADMIN_JWT_TOKEN"
```

- Admin users: Access granted
- Regular users: 403 Forbidden

## Testing

### Exercise 1: JWT with Login Tracking

1. Register a user
2. Login and receive JWT token
3. Check database for login_time and login_address:
```sql
SELECT username, login_time, login_address FROM users;
```
4. Access profile endpoint with token

### Exercise 2: Role-Based Access

1. Create admin user in database
2. Login as admin and get token
3. Access `/api/admin/dashboard` - should succeed
4. Login as regular user and try to access - should fail with 403

### Exercise 3: RabbitMQ Messaging

1. Start consumer in one terminal
2. Run producer1 in another terminal - consumer should receive message
3. Run producer2 in another terminal - consumer should receive message
4. Both messages should appear in consumer output

## Project Structure

```
lab6/
├── config/
│   ├── database.js          # MySQL connection
│   └── rabbitmq.js          # RabbitMQ config
├── middleware/
│   ├── auth.js              # JWT verification
│   └── roleCheck.js         # Role checking
├── routes/
│   ├── auth.js              # Register, login, profile
│   └── admin.js             # Admin endpoints
├── rabbitmq/
│   ├── producer1.js         # Producer 1
│   ├── producer2.js         # Producer 2
│   └── consumer.js          # Consumer
├── database/
│   └── schema.sql           # Database schema
├── .env                     # Environment variables
├── package.json             # Dependencies
└── server.js                # Main server
```

## Features Implemented

✅ **Exercise 1:** JWT authentication with login_time and login_address storage  
✅ **Exercise 2:** Role-based access control with admin/user roles  
✅ **Exercise 3:** RabbitMQ with 2 producers and 1 consumer
