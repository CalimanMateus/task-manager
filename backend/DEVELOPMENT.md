# Development Guide

This document explains the project architecture, code organization, and development workflow.

## 🏛️ Architecture Overview

The Task Manager API follows a layered architecture with clear separation of concerns:

```
HTTP Request
    ↓
Routes (authRoutes.js, userRoutes.js, taskRoutes.js)
    ↓
Middleware (auth.js - JWT validation)
    ↓
Controllers (authController.js, userController.js, taskController.js)
    ├─ Validate input
    ├─ Handle errors
    └─ Return HTTP responses
    ↓
Services (authService.js, userService.js, taskService.js)
    ├─ Business logic
    ├─ Authorization checks
    └─ Database operations via Prisma
    ↓
Database (PostgreSQL via Prisma ORM)
```

## 📂 File Organization

### `/src/middleware/auth.js`
**Purpose**: JWT authentication middleware

**Key Functions**:
- `authenticateToken(req, res, next)` - Validates JWT token and attaches user data to request

**How it works**:
1. Extracts token from `Authorization: Bearer <token>` header
2. Verifies token using JWT_SECRET
3. Attaches decoded user object to `req.user`
4. Passes control to next middleware/handler

**Usage**:
```javascript
router.get('/profile', authenticateToken, userController.getProfile);
```

### `/src/controllers/`
**Purpose**: Handle HTTP requests and responses

**Key Responsibilities**:
- Extract data from request (body, params, headers)
- Validate input
- Call appropriate service methods
- Handle errors and return HTTP responses
- Ensure proper status codes

**Pattern**:
```javascript
const controllerMethod = async (req, res) => {
  try {
    // Extract and validate input
    // Call service
    // Return response with proper status code
  } catch (error) {
    // Handle specific error types
    // Return error response
  }
};
```

**Files**:
- `authController.js` - Register, login
- `userController.js` - Get profile
- `taskController.js` - CRUD operations for tasks

### `/src/services/`
**Purpose**: Contain all business logic and database interactions

**Key Responsibilities**:
- Implement business logic
- Perform database queries via Prisma
- Validate data before database operations
- Check authorization (task ownership)
- Throw structured errors

**Error Handling Pattern**:
```javascript
throw {
  statusCode: 404,
  message: 'User not found'
};
```

**Files**:
- `authService.js` - User registration and login logic
- `userService.js` - User profile operations
- `taskService.js` - Task CRUD operations

### `/src/routes/`
**Purpose**: Define API endpoints and connect to controllers

**Pattern**:
```javascript
router.method(
  '/path',
  middleware(s),       // applied in order
  controller.method
);
```

**Files**:
- `authRoutes.js` - `/auth/register`, `/auth/login`
- `userRoutes.js` - `/users/profile` (with authentication)
- `taskRoutes.js` - `/tasks/*` (all with authentication)

### `/src/app.js`
**Purpose**: Configure Express application

**Responsibilities**:
- Initialize Express app
- Set up middleware (body parser, CORS, etc.)
- Register routes
- Error handling middleware

### `/src/server.js`
**Purpose**: Start the HTTP server

**Responsibilities**:
- Load environment variables
- Start listening on PORT
- Handle graceful shutdown

## 🔄 Request Flow Example

### POST /auth/register

```
1. Client sends POST request with { name, email, password }
   ↓
2. authRoutes.js matches the route
   ↓
3. authController.register() is called
   ├─ Extract data from req.body
   ├─ Validate input (required fields, email format, password length)
   └─ Call authService.registerUser()
   ↓
4. authService.registerUser()
   ├─ Check if email already exists in database
   ├─ Hash password with bcrypt
   ├─ Create user in database with Prisma
   ├─ Generate JWT token
   └─ Return user object and token
   ↓
5. authController catches success and returns 201 response
   ↓
6. Client receives token to use in future requests
```

### GET /tasks/:id (Protected)

```
1. Client sends GET request with Authorization header
   ↓
2. taskRoutes.js matches the route and applies authenticateToken middleware
   ↓
3. authenticateToken middleware
   ├─ Extracts token from header
   ├─ Verifies token
   └─ Attaches req.user = { id, email }
   ↓
4. taskController.getTaskById() is called
   ├─ Extract taskId from req.params
   ├─ Get userId from req.user (set by middleware)
   └─ Call taskService.getTaskById(taskId, userId)
   ↓
5. taskService.getTaskById()
   ├─ Query database for task by ID
   ├─ Check if task exists (throw 404 if not)
   ├─ Check if task.userId === userId (throw 403 if not owner)
   └─ Return task object
   ↓
6. taskController catches success and returns 200 response
   ↓
7. Client receives the task
```

## 🛡️ Security Features

### Password Hashing
```javascript
// In authService.js
const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
// SALT_ROUNDS = 10 -> ~10 hashing iterations

// On login
const isPasswordValid = await bcrypt.compare(plainPassword, hashedPassword);
```

### JWT Authentication
```javascript
// Token generation (7 days expiry)
const token = jwt.sign(
  { id: user.id, email: user.email },
  process.env.JWT_SECRET,
  { expiresIn: '7d' }
);

// Token verification (in middleware)
const decoded = jwt.verify(token, process.env.JWT_SECRET);
```

### Authorization
```javascript
// Example: Users can only access their own tasks
const task = await prisma.task.findUnique({ where: { id: taskId } });

if (task.userId !== userId) {
  throw {
    statusCode: 403,
    message: 'Unauthorized: You can only access your own tasks'
  };
}
```

## 📊 Database Schema Relationships

```
User (1) ←→ (Many) Task

User
├─ id (UUID, primary key)
├─ name (String)
├─ email (String, unique)
├─ password (String, hashed)
├─ createdAt (DateTime)
└─ tasks (Relation to Task)

Task
├─ id (UUID, primary key)
├─ title (String)
├─ description (String, optional)
├─ completed (Boolean, default: false)
├─ createdAt (DateTime)
├─ userId (String, foreign key)
└─ user (Relation to User)
```

## 🔧 Common Patterns

### Service Error Handling Pattern
```javascript
const serviceMethod = async (data) => {
  // Validate/Check conditions
  if (!condition) {
    throw {
      statusCode: 400, // 404, 403, etc.
      message: 'Human-readable error message'
    };
  }

  // Perform operation
  const result = await operation();
  return result;
};
```

### Controller Error Handling Pattern
```javascript
const controllerMethod = async (req, res) => {
  try {
    const result = await service.method();
    return res.status(200).json({
      success: true,
      message: 'Success message',
      data: result
    });
  } catch (error) {
    if (error.statusCode === 404) {
      return res.status(404).json({
        success: false,
        message: error.message
      });
    }
    // ... handle other error types

    console.error('Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};
```

## 🚀 Adding a New Feature

### Example: Add "Priority" field to Tasks

#### Step 1: Update Prisma Schema

Edit `prisma/schema.prisma`:
```prisma
model Task {
  // ... existing fields
  priority String @default("medium") // low, medium, high
}
```

#### Step 2: Create Migration

```bash
npx prisma migrate dev --name add_priority_to_task
```

#### Step 3: Update Task Service

Add priority handling in `src/services/taskService.js`:
```javascript
const createTask = async (data) => {
  const { title, description, priority, userId } = data;
  // ... validation
  
  const task = await prisma.task.create({
    data: {
      title,
      description,
      priority: priority || 'medium',
      userId,
    },
  });
  return task;
};
```

#### Step 4: Update Task Controller

Allow priority in `src/controllers/taskController.js`:
```javascript
const createTask = async (req, res) => {
  const { title, description, priority } = req.body;
  // ... validate
  const task = await taskService.createTask({
    title,
    description,
    priority,
    userId: req.user.id,
  });
  // ... response
};
```

#### Step 5: Update Routes (if needed)

No changes needed for existing routes.

## 📝 Error Handling Guidelines

**Standard Error Structure**:
```javascript
{
  statusCode: 400, // HTTP status code
  message: 'Human-readable error message'
}
```

**Common Status Codes**:
- 400: Bad Request (invalid input, missing fields)
- 401: Unauthorized (missing/invalid token)
- 403: Forbidden (access denied, wrong ownership)
- 404: Not Found (resource doesn't exist)
- 409: Conflict (duplicate email)
- 500: Internal Server Error (unexpected error)

## 🧪 Testing Tips

1. **Start with authentication**: Register, then login
2. **Use the token**: Copy token from response, use in next requests
3. **Test authorization**: Try accessing another user's task
4. **Test validation**: Submit invalid data (missing fields, wrong email, etc.)
5. **Test CRUD**: Create, read, update, delete for tasks
6. **Test edge cases**: Duplicate email, very long title, empty description, etc.

See `API_TESTING_GUIDE.md` for curl command examples.

## 🔍 Debugging Tips

1. **Check logs**: Server logs are printed to console
2. **Use Prisma Studio**: `npx prisma studio` to view data
3. **Postman/Insomnia**: Use for easier API testing
4. **Check environment variables**: Ensure `.env` file is correctly set up
5. **Database connection**: Verify DATABASE_URL is correct
6. **JWT Secret**: Ensure JWT_SECRET is set in environment

## 📚 Useful Commands

```bash
# Start development server
npm run dev

# Start production server
npm start

# Apply migrations
npx prisma migrate dev

# View data in database
npx prisma studio

# Generate Prisma client
npx prisma generate

# Create migration (after schema changes)
npx prisma migrate dev --name <migration_name>

# Reset database (⚠️ deletes all data)
npx prisma migrate reset
```

## 🎯 Code Quality Checklist

When adding new endpoints:

- [ ] Routes are properly registered in app.js
- [ ] Controllers validate input
- [ ] Services implement business logic
- [ ] Errors are properly thrown and caught
- [ ] HTTP status codes are correct
- [ ] Responses follow standard format
- [ ] Authorization checks are in place
- [ ] Middleware is applied where needed
- [ ] Code is commented for clarity
- [ ] No hardcoded values (use env vars)

## 📖 References

- [Express.js Documentation](https://expressjs.com/)
- [Prisma Documentation](https://www.prisma.io/docs/)
- [JWT Best Practices](https://tools.ietf.org/html/rfc8725)
- [OWASP Security Guide](https://owasp.org/)
