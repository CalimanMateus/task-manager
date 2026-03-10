# ✅ Task Manager Backend - Complete Setup Guide

## 📦 What's Included

### Core Files Created

#### Middleware
- `src/middleware/auth.js` - JWT authentication middleware

#### Services (Business Logic)
- `src/services/authService.js` - User registration and login
- `src/services/userService.js` - User profile operations
- `src/services/taskService.js` - Task CRUD operations

#### Controllers (Request Handlers)
- `src/controllers/authController.js` - Auth endpoints
- `src/controllers/userController.js` - User endpoints
- `src/controllers/taskController.js` - Task endpoints

#### Routes (API Endpoints)
- `src/routes/authRoutes.js` - `/auth/*` routes
- `src/routes/userRoutes.js` - `/users/*` routes
- `src/routes/taskRoutes.js` - `/tasks/*` routes

#### Application
- `src/app.js` - Express application setup
- `src/server.js` - Server entry point

#### Configuration
- `.env.example` - Environment variables template
- `.gitignore` - Git ignore rules
- `package.json` (updated) - Scripts for dev and production

#### Documentation
- `README.md` - Complete API documentation
- `DEVELOPMENT.md` - Architecture and development guide
- `API_TESTING_GUIDE.md` - Curl commands for testing
- `SETUP_GUIDE.md` - This file

## 🚀 Quick Start (5 minutes)

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Configure Database
```bash
# Copy environment template
cp .env.example .env

# Edit .env with your database URL
# DATABASE_URL=postgresql://user:password@localhost:5432/task_manager
```

### 3. Set Up Database
```bash
# Apply Prisma migrations (assumes database exists)
npx prisma migrate dev --name init
```

### 4. Start Server
```bash
# Development (with auto-reload)
npm run dev

# Or production
npm start
```

Server will run on `http://localhost:3000`

## 📋 API Overview

### Authentication (Public)
- `POST /auth/register` - Register new user
- `POST /auth/login` - Login user

### Users (Protected)
- `GET /users/profile` - Get current user profile

### Tasks (Protected)
- `POST /tasks` - Create task
- `GET /tasks` - List user's tasks
- `GET /tasks/:id` - Get specific task
- `PUT /tasks/:id` - Update task
- `DELETE /tasks/:id` - Delete task
- `PATCH /tasks/:id/complete` - Mark task complete

## 🔐 Authentication Flow

```
1. Register or Login → Get JWT Token
2. Use Token in Headers → Authorization: Bearer <token>
3. Token Expires → Re-login to get new token
```

## 📝 Environment Variables

Create `.env` file based on `.env.example`:

```env
PORT=3000
NODE_ENV=development
DATABASE_URL=postgresql://user:password@localhost:5432/task_manager
JWT_SECRET=your-super-secret-key-change-in-production
CORS_ORIGIN=http://localhost:3000
```

## 🧪 Test the API

See `API_TESTING_GUIDE.md` for curl commands or use these steps:

```bash
# 1. Register a user
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@example.com","password":"password123"}'

# 2. Copy the token from response

# 3. Create a task
curl -X POST http://localhost:3000/tasks \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"title":"My Task","description":"Do something"}'

# 4. Get all tasks
curl -X GET http://localhost:3000/tasks \
  -H "Authorization: Bearer <token>"
```

## 📂 Project Structure

```
backend/
├── src/
│   ├── middleware/
│   │   └── auth.js                 # JWT validation
│   ├── services/
│   │   ├── authService.js          # Auth logic
│   │   ├── userService.js          # User logic
│   │   └── taskService.js          # Task logic
│   ├── controllers/
│   │   ├── authController.js       # Auth handlers
│   │   ├── userController.js       # User handlers
│   │   └── taskController.js       # Task handlers
│   ├── routes/
│   │   ├── authRoutes.js           # Auth routes
│   │   ├── userRoutes.js           # User routes
│   │   └── taskRoutes.js           # Task routes
│   ├── app.js                      # Express config
│   └── server.js                   # Server startup
├── prisma/
│   ├── schema.prisma               # Database schema
│   └── migrations/                 # Database migrations
├── package.json                    # Dependencies
├── .env.example                    # Environment template
├── README.md                       # Full API docs
├── DEVELOPMENT.md                 # Architecture guide
├── API_TESTING_GUIDE.md           # Testing commands
└── SETUP_GUIDE.md                 # This file
```

## 🎯 Key Features

✅ **Authentication**
- JWT tokens with 7-day expiry
- Secure password hashing with bcrypt
- Token-based authorization

✅ **Task Management**
- Full CRUD operations
- User-specific tasks
- Task completion tracking

✅ **Architecture**
- Clean separation (Controllers → Services)
- Middleware for cross-cutting concerns
- Centralized error handling

✅ **Database**
- Prisma ORM for type-safe queries
- PostgreSQL relational database
- User-Task relationships

✅ **API Standards**
- RESTful endpoints
- Proper HTTP status codes
- Consistent JSON responses
- Input validation

## 🔧 Common Tasks

### Add a New Field to Task
1. Update `prisma/schema.prisma`
2. Run `npx prisma migrate dev --name add_field_name`
3. Update service and controller

### Connect to Database
1. Set `DATABASE_URL` in `.env`
2. Run `npx prisma migrate dev`

### View Database Data
```bash
npx prisma studio
```

### Generate Database Client
```bash
npx prisma generate
```

## ⚠️ Important Notes

1. **Never commit `.env`** - It contains sensitive data
2. **Change JWT_SECRET in production** - Use a long, random string
3. **Use HTTPS in production** - Never use HTTP for auth
4. **Test authorization** - Users can only access their own data
5. **Validate inputs** - Services perform security checks

## 📚 Documentation

- **README.md** - Full API specification and usage examples
- **DEVELOPMENT.md** - Architecture, patterns, and guidelines
- **API_TESTING_GUIDE.md** - Curl commands for all endpoints
- **Code comments** - Inline documentation in source files

## 🆘 Troubleshooting

### Connection Refused
- Check if server is running (`npm run dev`)
- Verify PORT in `.env` matches

### Database Error
- Check `DATABASE_URL` is correct
- Verify PostgreSQL is running
- Run `npx prisma migrate dev`

### Token Errors
- Token might be expired (7 days)
- Re-login to get new token
- Check `JWT_SECRET` is set

### CORS Issues
- Update `CORS_ORIGIN` in `.env`
- Or adjust CORS settings in `src/app.js`

## 🎓 Learning Resources

### Files to Study
1. Start with `README.md` - Understand API
2. Read `DEVELOPMENT.md` - Learn architecture
3. Check `src/controllers/` - See request handling
4. Review `src/services/` - Understand business logic
5. Look at `src/middleware/auth.js` - JWT implementation

### Concepts to Master
- REST API design
- JWT authentication
- Password hashing
- Prisma ORM
- Express middleware
- Error handling

## ✨ What's Next?

### Suggested Improvements
1. **Rate limiting** - Add to prevent abuse
2. **Request logging** - Track API usage
3. **Email verification** - Validate user emails
4. **Password reset** - Allow users to reset password
5. **Task categories** - Organize tasks by type
6. **Task tags** - Add tagging system
7. **Due dates** - Add task deadlines
8. **Notifications** - Alert users on task changes

### Testing
- Write unit tests for services
- Add integration tests
- Test error cases
- Load testing

### Deployment
- Deploy to Heroku, AWS, DigitalOcean, or similar
- Set up CI/CD pipeline
- Monitor performance
- Implement logging and error tracking

## 📞 Support

For questions or issues:
1. Check existing documentation
2. Review code comments
3. Look at curl examples in API_TESTING_GUIDE.md
4. Check Prisma documentation
5. Review Express.js guides

## 🎉 Ready to Go!

Your Task Manager API is complete and ready to use. Start the server and begin building!

```bash
npm run dev
```

Happy coding! 💻
