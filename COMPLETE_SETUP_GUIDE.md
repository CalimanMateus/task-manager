# Task Manager - Complete Setup & Running Guide

A full-stack Task Manager application with React frontend and Node.js/Express backend.

## 📦 Project Overview

```
task-manager/
├── backend/                # Node.js/Express API
│   ├── src/
│   ├── prisma/
│   ├── package.json
│   └── README.md
└── frontend/               # React SPA
    ├── src/
    ├── package.json
    └── FRONTEND_README.md
```

## 🚀 Quick Start (Production Ready)

### Backend Setup (Terminal 1)

```bash
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env
# Edit .env:
# DATABASE_URL=postgresql://user:password@localhost:5432/task_manager
# JWT_SECRET=your_secure_secret_key

# Apply database migrations
npx prisma migrate dev --name init

# Start development server
npm run dev
```

✅ Backend running on `http://localhost:3000`

### Frontend Setup (Terminal 2)

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm start
```

✅ Frontend running on `http://localhost:3000` (via React dev server)

**Note:** React dev server typically runs on port 3000, if that port is in use it will run on 3001.

## 🎯 What You Get

### Backend Features
✅ User authentication (register/login)
✅ JWT token management
✅ Task CRUD operations
✅ User-scoped tasks
✅ Password hashing (bcrypt)
✅ Clean architecture (Controllers → Services)
✅ Comprehensive error handling
✅ PostgreSQL with Prisma ORM

### Frontend Features
✅ User registration & login
✅ Task management dashboard
✅ Create, read, update, delete tasks
✅ Mark tasks as completed
✅ Responsive design
✅ Protected routes
✅ JWT token persistence
✅ Clean, simple UI

## 📚 Documentation

### Backend
- [backend/README.md](backend/README.md) - Full API documentation
- [backend/SETUP_GUIDE.md](backend/SETUP_GUIDE.md) - Setup instructions
- [backend/DEVELOPMENT.md](backend/DEVELOPMENT.md) - Architecture & patterns
- [backend/API_TESTING_GUIDE.md](backend/API_TESTING_GUIDE.md) - API test examples

### Frontend
- [frontend/FRONTEND_README.md](frontend/FRONTEND_README.md) - Feature overview
- [frontend/SETUP_GUIDE.md](frontend/SETUP_GUIDE.md) - Setup instructions
- [frontend/TESTING_GUIDE.md](frontend/TESTING_GUIDE.md) - Manual testing guide

## 🔌 System Architecture

```
User Browser
    ↓
React Frontend (http://localhost:3000)
    ↓
Express API (http://localhost:3000)
    ↓
PostgreSQL Database
```

## 📋 Tech Stack

### Frontend
- React 19
- React Router v6 (routing)
- Fetch API (HTTP requests)
- CSS3 (styling)

### Backend
- Node.js + Express
- PostgreSQL
- Prisma ORM
- JWT authentication
- bcrypt password hashing

## 🗄️ Database Setup

### PostgreSQL Installation

**Windows:**
```bash
# Download and install from https://www.postgresql.org/download/windows/
# Default port: 5432
# Default user: postgres
```

**macOS:**
```bash
brew install postgresql
brew services start postgresql
```

**Linux:**
```bash
sudo apt-get install postgresql
sudo systemctl start postgresql
```

### Create Database

```bash
# Connect to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE task_manager;

# Exit
\q
```

### Update .env

```
DATABASE_URL=postgresql://postgres:password@localhost:5432/task_manager
```

## 🧪 Testing the Application

### Manual Testing

1. **Register**
   - Go to http://localhost:3000
   - Register with email and password
   - Verify success redirect to dashboard

2. **Login**
   - Go to http://localhost:3000
   - Login with registered credentials
   - Verify redirect to dashboard

3. **Create Task**
   - From dashboard, enter task title
   - Click "Add Task"
   - Verify task appears in list

4. **Edit Task**
   - Click "Edit" on any task
   - Modify details
   - Click "Save"
   - Verify changes saved

5. **Complete Task**
   - Click checkbox on task
   - Verify task marked as completed

6. **Delete Task**
   - Click "Delete" on any task
   - Confirm deletion
   - Verify task removed

### API Testing

See [backend/API_TESTING_GUIDE.md](backend/API_TESTING_GUIDE.md) for curl commands.

## 🔑 Authentication Flow

1. **Register**: Create account → Backend hashes password → Returns JWT token
2. **Store Token**: Token saved in `localStorage`
3. **API Requests**: Token automatically included in requests
4. **Protected Routes**: Routes check for token
5. **Logout**: Token cleared from storage

## 📱 Project File Structure

### Backend Files Created

```
backend/src/
├── middleware/
│   └── auth.js                    # JWT validation
├── services/
│   ├── authService.js             # Auth logic
│   ├── userService.js             # User operations
│   └── taskService.js             # Task CRUD
├── controllers/
│   ├── authController.js          # Auth handlers
│   ├── userController.js          # User handlers
│   └── taskController.js          # Task handlers
├── routes/
│   ├── authRoutes.js              # Auth endpoints
│   ├── userRoutes.js              # User endpoints
│   └── taskRoutes.js              # Task endpoints
├── app.js                         # Express configuration
└── server.js                      # Server startup

Configuration:
├── .env.example                   # Environment template
├── .gitignore                     # Git ignore rules
├── package.json                   # Updated scripts
└── README.md                      # API docs
```

### Frontend Files Created

```
frontend/src/
├── components/
│   ├── TaskItem.js               # Task list item
│   ├── TaskItem.css
│   ├── TaskForm.js               # Create task form
│   ├── TaskForm.css
│   └── ProtectedRoute.js         # Route protection
├── pages/
│   ├── Register.js               # Registration page
│   ├── Register.css
│   ├── Login.js                  # Login page
│   ├── Login.css
│   ├── Dashboard.js              # Main dashboard
│   └── Dashboard.css
├── services/
│   └── api.js                    # API communication
├── utils/
│   └── auth.js                   # Auth utilities
├── App.js                        # Main app + routing
├── App.css                       # Global styles
└── index.js                      # Entry point

Configuration:
├── SETUP_GUIDE.md               # Setup instructions
├── TESTING_GUIDE.md             # Testing guide
└── FRONTEND_README.md           # Detailed docs
```

## 🚀 Production Deployment

### Backend Deployment

1. **Build:**
   ```bash
   npm run build  # if you have build script
   ```

2. **Host options:**
   - Heroku
   - Railway.app
   - Render
   - AWS EC2
   - DigitalOcean

3. **Before deploying:**
   - Change `JWT_SECRET` to secure random string
   - Use managed PostgreSQL (AWS RDS, etc.)
   - Set up HTTPS
   - Configure CORS for your domain

### Frontend Deployment

1. **Build:**
   ```bash
   npm run build
   ```

2. **Deploy `build/` folder to:**
   - Vercel (recommended for React)
   - Netlify
   - AWS S3 + CloudFront
   - GitHub Pages
   - Any static hosting

3. **Configure:**
   - Set `REACT_APP_API_URL` to production API
   - Update backend CORS to allow domain

## 🆘 Troubleshooting

### Backend Issues

**"Cannot connect to database"**
- Verify PostgreSQL is running
- Check DATABASE_URL is correct
- Ensure database exists

**"Port 3000 already in use"**
- Change PORT in .env
- Or kill process: `lsof -i :3000` → `kill -9 <PID>`

**"JWT errors"**
- Ensure JWT_SECRET is set
- Check token hasn't expired

### Frontend Issues

**"API connection failed"**
- Verify backend is running
- Check REACT_APP_API_URL is correct
- Check browser console for errors

**"Stuck on login page"**
- Clear localStorage: DevTools → Application → Clear
- Verify token is stored: Check localStorage tab

**"Tasks not loading"**
- Check backend is running
- Check browser Network tab for 401/403 errors
- Re-login to get fresh token

## 📊 API Endpoints Summary

### Public Routes
- `POST /auth/register` - Create account
- `POST /auth/login` - Sign in
- `GET /health` - Server health check

### Protected Routes (Require JWT)
- `GET /users/profile` - Get user profile
- `POST /tasks` - Create task
- `GET /tasks` - List tasks
- `GET /tasks/:id` - Get task
- `PUT /tasks/:id` - Update task
- `DELETE /tasks/:id` - Delete task
- `PATCH /tasks/:id/complete` - Mark complete

Full API documentation: [backend/README.md](backend/README.md)

## 🎓 Learning Resources

### Backend Knowledge
- Node.js fundamentals
- Express.js routing & middleware
- Prisma ORM usage
- JWT authentication
- Password hashing with bcrypt
- RESTful API design

### Frontend Knowledge
- React hooks (useState, useEffect)
- React Router DOM
- Fetch API
- Component composition
- State management
- Form handling

## ✨ Next Steps

### Suggested Features
1. Task categories/tags
2. Due dates for tasks
3. Task priority levels
4. Task search/filter
5. Email verification
6. Password reset
7. Dark mode
8. User profile page
9. Task sharing
10. Push notifications

### Code Improvements
1. Add unit tests
2. Add integration tests
3. Add error logging
4. Add request validation
5. Implement rate limiting
6. Add API documentation (Swagger)
7. Database backups
8. Monitoring & alerts

## 📞 Support

### Debugging Steps

1. **Check logs**
   - Backend: Console output
   - Frontend: Browser console (F12)
   - Database: PostgreSQL logs

2. **Use dev tools**
   - Backend: `npx prisma studio` to view data
   - Frontend: DevTools Network, Application tabs
   - API: Test with curl or Postman

3. **Read documentation**
   - Backend: [backend/README.md](backend/README.md)
   - Frontend: [frontend/FRONTEND_README.md](frontend/FRONTEND_README.md)
   - Testing: [backend/API_TESTING_GUIDE.md](backend/API_TESTING_GUIDE.md)

4. **Check existing tests**
   - See testing guides for common issues
   - Try manual test cases

## 🎉 Ready to Go!

You now have a complete, production-ready Task Manager application!

```bash
# Terminal 1: Backend
cd backend && npm run dev

# Terminal 2: Frontend
cd frontend && npm start
```

Visit **http://localhost:3000** → Register → Start managing tasks!

**Happy coding! 💻✨**
