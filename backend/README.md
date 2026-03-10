# Task Manager API

A complete, production-ready REST API for managing tasks with user authentication. Built with Node.js, Express, PostgreSQL, and Prisma ORM.

## 🚀 Features

- ✅ User authentication with JWT
- ✅ Password hashing with bcrypt
- ✅ Task CRUD operations
- ✅ Clean separation of concerns (Controllers, Services, Routes, Middleware)
- ✅ Comprehensive error handling
- ✅ Input validation
- ✅ Authorization checks
- ✅ Proper HTTP status codes
- ✅ CORS enabled

## 📋 Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: JWT (jsonwebtoken)
- **Password Hashing**: bcrypt
- **Environment**: dotenv

## 📁 Project Structure

```
backend/
├── src/
│   ├── controllers/          # Request handlers
│   │   ├── authController.js
│   │   ├── userController.js
│   │   └── taskController.js
│   ├── services/            # Business logic
│   │   ├── authService.js
│   │   ├── userService.js
│   │   └── taskService.js
│   ├── routes/              # API endpoints
│   │   ├── authRoutes.js
│   │   ├── userRoutes.js
│   │   └── taskRoutes.js
│   ├── middleware/          # Custom middleware
│   │   └── auth.js          # JWT authentication
│   ├── app.js              # Express app setup
│   └── server.js           # Server entry point
├── prisma/
│   ├── schema.prisma       # Database schema
│   └── migrations/         # Database migrations
├── .env.example            # Environment variables template
├── package.json
└── README.md
```

## 🔧 Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Copy `.env.example` to `.env` and update with your configuration:

```bash
cp .env.example .env
```

**Example `.env` file:**
```
PORT=3000
NODE_ENV=development
DATABASE_URL=postgresql://user:password@localhost:5432/task_manager
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
CORS_ORIGIN=http://localhost:3000
```

### 3. Set Up Database

```bash
# Apply migrations
npx prisma migrate dev --name init

# (Optional) Open Prisma Studio to view data
npx prisma studio
```

### 4. Start the Server

**Development mode (with auto-reload):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

Server will be available at `http://localhost:3000`

## 📚 API Endpoints

### Health Check
- `GET /health` - Server status check

### Authentication Routes
All authentication endpoints are public (no JWT required)

#### Register User
```http
POST /auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": "uuid",
      "name": "John Doe",
      "email": "john@example.com"
    },
    "token": "eyJhbGciOiJIUzI1NiIs..."
  }
}
```

#### Login User
```http
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "uuid",
      "name": "John Doe",
      "email": "john@example.com"
    },
    "token": "eyJhbGciOiJIUzI1NiIs..."
  }
}
```

### User Routes
All user routes require JWT authentication in the `Authorization` header

#### Get User Profile
```http
GET /users/profile
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "User profile retrieved successfully",
  "data": {
    "id": "uuid",
    "name": "John Doe",
    "email": "john@example.com",
    "createdAt": "2026-03-10T12:00:00Z"
  }
}
```

### Task Routes
All task routes require JWT authentication in the `Authorization` header

#### Create a Task
```http
POST /tasks
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
Content-Type: application/json

{
  "title": "Complete project",
  "description": "Finish the task manager API"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Task created successfully",
  "data": {
    "id": "uuid",
    "title": "Complete project",
    "description": "Finish the task manager API",
    "completed": false,
    "createdAt": "2026-03-10T12:00:00Z",
    "userId": "uuid"
  }
}
```

#### Get All Tasks
```http
GET /tasks
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Tasks retrieved successfully",
  "data": [
    {
      "id": "uuid",
      "title": "Complete project",
      "description": "Finish the task manager API",
      "completed": false,
      "createdAt": "2026-03-10T12:00:00Z",
      "userId": "uuid"
    }
  ]
}
```

#### Get a Specific Task
```http
GET /tasks/:id
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Task retrieved successfully",
  "data": {
    "id": "uuid",
    "title": "Complete project",
    "description": "Finish the task manager API",
    "completed": false,
    "createdAt": "2026-03-10T12:00:00Z",
    "userId": "uuid"
  }
}
```

#### Update a Task
```http
PUT /tasks/:id
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
Content-Type: application/json

{
  "title": "Complete API documentation",
  "description": "Write comprehensive docs",
  "completed": false
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Task updated successfully",
  "data": {
    "id": "uuid",
    "title": "Complete API documentation",
    "description": "Write comprehensive docs",
    "completed": false,
    "createdAt": "2026-03-10T12:00:00Z",
    "userId": "uuid"
  }
}
```

#### Mark Task as Complete
```http
PATCH /tasks/:id/complete
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Task marked as complete",
  "data": {
    "id": "uuid",
    "title": "Complete project",
    "description": "Finish the task manager API",
    "completed": true,
    "createdAt": "2026-03-10T12:00:00Z",
    "userId": "uuid"
  }
}
```

#### Delete a Task
```http
DELETE /tasks/:id
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Task deleted successfully",
  "data": {
    "id": "uuid",
    "title": "Complete project",
    "description": "Finish the task manager API",
    "completed": false,
    "createdAt": "2026-03-10T12:00:00Z",
    "userId": "uuid"
  }
}
```

## 🔐 Authentication

All protected endpoints require a JWT token in the `Authorization` header:

```
Authorization: Bearer <your_jwt_token>
```

The token is obtained during registration or login and expires in 7 days by default.

## 📝 Error Handling

The API returns appropriate HTTP status codes:

- `200 OK` - Successful GET, PUT, PATCH, DELETE operations
- `201 Created` - Successful POST operations
- `400 Bad Request` - Invalid input or missing required fields
- `401 Unauthorized` - Missing or invalid authentication token
- `403 Forbidden` - Insufficient permissions (e.g., accessing another user's task)
- `404 Not Found` - Resource not found
- `409 Conflict` - Email already registered
- `500 Internal Server Error` - Server-side error

**Error Response Format:**
```json
{
  "success": false,
  "message": "Error description"
}
```

## 🏗️ Architecture

### Controllers
Handle HTTP requests and responses. Validate input and delegate business logic to services.

### Services
Contain all business logic. Interact with the database through Prisma. Handle authorization checks.

### Middleware
Handle cross-cutting concerns like authentication.

### Routes
Define API endpoints and connect them to controllers.

## 🔑 Key Features Explained

### JWT Authentication
- Generated on successful registration/login
- Expires in 7 days
- Passed in `Authorization: Bearer <token>` header
- Verified on protected routes

### Password Security
- Hashed using bcrypt with 10 salt rounds
- Never stored in plain text
- Compared securely on login

### Authorization
- Users can only access their own tasks
- Service layer validates task ownership
- Returns 403 Forbidden for unauthorized access

### Input Validation
- Email format validation
- Password length requirements (minimum 6 characters)
- Required field checks
- Prevents SQL injection (via Prisma)

## 📧 Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Server port | `3000` |
| `NODE_ENV` | Environment type | `development` or `production` |
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://user:password@localhost:5432/task_manager` |
| `JWT_SECRET` | Secret key for JWT signing | Long random string |
| `CORS_ORIGIN` | Allowed CORS origin | `http://localhost:3000` |

## 🚀 Production Considerations

1. **Update JWT_SECRET**: Use a long, random, secure string
2. **Database**: Use a managed PostgreSQL service (AWS RDS, Heroku, etc.)
3. **Environment Variables**: Use a secure secret management solution
4. **HTTPS**: Always use HTTPS in production
5. **Rate Limiting**: Add rate limiting middleware for production
6. **Logging**: Implement comprehensive logging
7. **CORS**: Configure specific allowed origins instead of `*`
8. **Validation**: Add additional input validation as needed

## 📄 License

ISC

## 👨‍💻 Author

Senior Backend Engineer
