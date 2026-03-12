# Frontend Setup Guide

## 🚀 Quick Start (2 minutes)

### Prerequisites

✅ Node.js installed (v14 or higher)
✅ Backend API running on `http://localhost:3000`

### Step 1: Install Dependencies

```bash
cd frontend
npm install
```

This will install:
- React
- React Router DOM
- Testing libraries

### Step 2: Start Development Server

```bash
npm start
```

The app will open automatically at `http://localhost:3000`

### Step 3: Test the App

1. **Register** - Create a new account
2. **Login** - Sign in with your credentials
3. **Create Task** - Add a new task
4. **View Tasks** - See your task list
5. **Edit Task** - Modify task details
6. **Complete Task** - Check off completed tasks
7. **Delete Task** - Remove tasks

## 📋 Available Scripts

```bash
# Start development server (with hot reload)
npm start

# Build for production
npm run build

# Run tests
npm test

# Eject configuration (one-way operation!)
npm eject
```

## 🔧 Environment Variables

Create a `.env` file in the `frontend` folder (optional):

```env
REACT_APP_API_URL=http://localhost:3000
```

Default: `http://localhost:3000`

## 📁 Project Structure

```
frontend/
├── public/
│   ├── index.html          # Main HTML file
│   └── favicon.ico
├── src/
│   ├── components/         # Reusable components
│   │   ├── TaskItem.js
│   │   ├── TaskForm.js
│   │   └── ProtectedRoute.js
│   ├── pages/              # Page components
│   │   ├── Register.js
│   │   ├── Login.js
│   │   └── Dashboard.js
│   ├── services/           # API communication
│   │   └── api.js
│   ├── utils/              # Utility functions
│   │   └── auth.js
│   ├── App.js              # Main app component with routing
│   ├── index.js            # React entry point
│   └── index.css           # Global styles
├── package.json            # Dependencies
└── FRONTEND_README.md      # Detailed documentation
```

## 🎯 Features Overview

### ✅ User Authentication

- **Register** - Create new account with name, email, password
- **Login** - Sign in with email and password
- **JWT Tokens** - Automatically stored in localStorage
- **Protected Routes** - Dashboard requires authentication

### ✅ Task Management

- **Create** - Add new tasks with title and optional description
- **Read** - View all your tasks in a nice list
- **Update** - Edit task title and description
- **Complete** - Mark tasks as done with a checkbox
- **Delete** - Remove tasks (with confirmation)

### ✅ User Experience

- **Responsive Design** - Works on desktop and mobile
- **Input Validation** - Forms validate before submission
- **Error Messages** - Clear feedback on failures
- **Loading States** - Visual feedback during API calls
- **Auto Redirect** - Automatic navigation based on auth state

## 🔌 API Communication

All API calls use the Fetch API (no axios needed).

**Base URL:** `http://localhost:3000`

**Authentication:** JWT token in `Authorization: Bearer <token>` header

### Available Endpoints

See [backend/README.md](../backend/README.md) for full API documentation.

## 🎨 Styling

- **No CSS frameworks** - Pure CSS for simplicity
- **Mobile responsive** - Adapts to different screen sizes
- **Clean design** - Focus on functionality
- **Gradient backgrounds** - Auth pages with gradient

## 🚨 Troubleshooting

### "Cannot connect to API"

```
Error: Network error. Is the server running?
```

**Solution:**
1. Ensure backend is running: `npm run dev` (in backend folder)
2. Check API URL is correct in environment variables
3. Verify backend is on port 3000

### "Invalid token"

```
Error: Invalid or expired token
```

**Solution:**
1. Re-login to get a fresh token
2. Tokens expire after 7 days

### "Email already registered"

```
Error: Email is already registered
```

**Solution:**
1. Use a different email address
2. Or login if you already have an account

### "Port 3000 is already in use"

```
Port 3000 is already in use
```

**Solution:**
1. Kill the process on port 3000
2. Or use a different port: `PORT=3001 npm start`

## 📱 Mobile Testing

The app is optimized for mobile:

```bash
# Test on device
npm start
# Then visit: http://<your-ip>:3000 from mobile
```

Or use browser dev tools:
- DevTools → Toggle device toolbar (Ctrl+Shift+M)

## 🧪 Manual Testing Checklist

### Authentication

- [ ] Register with new email
- [ ] Login with registered email
- [ ] Invalid email format is rejected
- [ ] Password too short is rejected
- [ ] Passwords don't match is rejected
- [ ] Already registered email is rejected
- [ ] Invalid credentials show error
- [ ] Successful login redirects to dashboard

### Tasks

- [ ] Create task with title only
- [ ] Create task with title and description
- [ ] View all tasks in list
- [ ] Edit task title
- [ ] Edit task description
- [ ] Delete task (with confirmation)
- [ ] Mark task as completed
- [ ] Unmark completed task
- [ ] Task count updates correctly

### Navigation

- [ ] Logout clears token and redirects
- [ ] Cannot access dashboard without token
- [ ] Cannot access login when authenticated
- [ ] Refresh page keeps authentication
- [ ] Invalid URLs redirect to login

## 🔐 Security

### Token Storage

- Tokens stored in `localStorage`
- Cleared on logout
- Automatically sent in API requests

### Best Practices

- ✅ Password hashed on backend (bcrypt)
- ✅ HTTPS recommended for production
- ✅ Token expires in 7 days
- ✅ Protected routes verify authentication

### Production Notes

- Consider using `httpOnly` cookies instead of localStorage
- Add HTTPS enforcement
- Implement token refresh mechanism
- Add rate limiting on frontend

## 📚 Additional Resources

### Learn More

- [React Documentation](https://react.dev)
- [React Router Documentation](https://reactrouter.com)
- [Fetch API Guide](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)

### Related Files

- [Frontend Detailed Guide](FRONTEND_README.md)
- [Backend Setup](../backend/SETUP_GUIDE.md)
- [API Documentation](../backend/README.md)

## 🎉 You're Ready!

```bash
# Install and start
npm install
npm start
```

The app will open at `http://localhost:3000/login`

Happy tasking! 📝✨
