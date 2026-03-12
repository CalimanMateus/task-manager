# Task Manager Frontend - React

A simple, functional React frontend for the Task Manager API. Built with React Router for navigation and Fetch API for backend communication.

## 🎯 Features

✅ User Registration & Login
✅ JWT Token Management (localStorage)
✅ Task CRUD Operations (Create, Read, Update, Delete)
✅ Mark Tasks as Completed
✅ Protected Routes (Authentication Required)
✅ Responsive Design
✅ Simple & Clean UI

## 📂 Project Structure

```
src/
├── components/
│   ├── TaskItem.js           # Individual task component
│   ├── TaskItem.css
│   ├── TaskForm.js           # Create task form component
│   ├── TaskForm.css
│   └── ProtectedRoute.js     # Route protection wrapper
├── pages/
│   ├── Register.js           # Registration page
│   ├── Register.css
│   ├── Login.js              # Login page
│   ├── Login.css
│   ├── Dashboard.js          # Main tasks dashboard
│   └── Dashboard.css
├── services/
│   └── api.js                # API communication layer
├── utils/
│   └── auth.js               # Authentication utilities
├── App.js                    # Main app with routing
├── App.css
├── index.js                  # React entry point
└── index.css
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14+)
- npm or yarn
- Backend API running on `http://localhost:3000`

### Installation

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm start
```

Server will run on `http://localhost:3000` (React dev server)

### Build for Production

```bash
npm run build
```

## 🔧 Configuration

### API Base URL

By default, the app connects to `http://localhost:3000`.

To change the API URL, set the environment variable:

```bash
# .env file
REACT_APP_API_URL=http://your-api-url.com
```

Or update in [src/services/api.js](src/services/api.js):

```javascript
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';
```

## 📖 Page Overview

### 1. Register Page (`/register`)

- Create a new user account
- Form validation
- Auto-redirect to dashboard on success
- Link to login page for existing users

**Form Fields:**
- Full Name
- Email
- Password (min 6 characters)
- Confirm Password

### 2. Login Page (`/login`)

- Authenticate with email and password
- Store JWT token in localStorage
- Auto-redirect to dashboard on success
- Link to register page for new users

**Form Fields:**
- Email
- Password

### 3. Dashboard Page (`/dashboard`) - Protected

- View all your tasks
- Create new tasks
- Edit existing tasks
- Delete tasks
- Mark tasks as completed
- Task statistics (total, completed, remaining)
- Logout button

## 🔑 Key Components

### TaskForm Component

Creates new tasks.

```javascript
<TaskForm onSubmit={handleCreateTask} isLoading={isLoading} />
```

**Props:**
- `onSubmit(title, description)` - Callback when form is submitted
- `isLoading` - Show loading state while submitting

### TaskItem Component

Displays individual task with edit/delete options.

```javascript
<TaskItem 
  task={task}
  onEdit={handleEditTask}
  onDelete={handleDeleteTask}
  onComplete={handleCompleteTask}
/>
```

**Props:**
- `task` - Task object
- `onEdit(id, title, description)` - Edit handler
- `onDelete(id)` - Delete handler
- `onComplete(id)` - Complete status toggle

### ProtectedRoute Component

Wrapper to protect authenticated routes.

```javascript
<ProtectedRoute>
  <Dashboard />
</ProtectedRoute>
```

## 🔐 Authentication Flow

1. **Register**: User creates account → API returns token
2. **Store Token**: Token saved in `localStorage.token`
3. **API Requests**: Token automatically included in `Authorization` header
4. **Protected Routes**: Routes check if token exists
5. **Logout**: Token removed from localStorage

### Token Management

Located in [src/utils/auth.js](src/utils/auth.js):

```javascript
// Store token
setToken(token);

// Get token
const token = getToken();

// Check if authenticated
if (isAuthenticated()) { }

// Logout
logout();
```

## 🌐 API Integration

All API calls are in [src/services/api.js](src/services/api.js)

### Authentication APIs

```javascript
authAPI.register(name, email, password)
authAPI.login(email, password)
```

### User APIs

```javascript
userAPI.getProfile()
```

### Task APIs

```javascript
taskAPI.getTasks()
taskAPI.getTask(id)
taskAPI.createTask(title, description)
taskAPI.updateTask(id, title, description, completed)
taskAPI.deleteTask(id)
taskAPI.completeTask(id)
```

### Error Handling

All API errors are thrown as objects:

```javascript
{
  status: 401,
  message: 'Invalid email or password'
}
```

Handle errors in components:

```javascript
try {
  await taskAPI.createTask(title, description);
} catch (err) {
  setError(err.message); // Display error
}
```

## 🎨 Styling

- **Simple CSS** - No CSS frameworks, plain CSS files
- **Responsive** - Mobile-friendly layouts
- **Gradient backgrounds** - Auth pages
- **Clean design** - Focus on functionality

### CSS Files

- `App.css` - Global styles and utilities
- Component-specific CSS files for scoped styles

## 🔄 State Management

Uses React hooks:

- `useState` - Local state management
- `useEffect` - Side effects and data fetching
- `useNavigate` - Programmatic routing

No external state management library needed.

## 📱 Responsive Design

The app is mobile-friendly with:
- Flexible layouts
- Touch-friendly buttons
- Responsive text sizes
- Mobile-optimized forms

## 🧪 Testing the App

### Without Backend

The app requires the backend API to be running. If the API is down:

1. Register fails - "Network error"
2. Login fails - "Network error"
3. Tasks fail to load/update

**Solution:** Start the backend first

```bash
# In backend directory
npm run dev
```

### With Sample Data

After logging in, use the dashboard to:

1. Create a new task
2. Edit the task
3. Mark it as completed
4. Delete the task

## ⚠️ Common Issues

### "Network error. Is the server running?"

**Cause:** Backend API is not running
**Solution:** Start backend with `npm run dev`

### Token not working / "Invalid token"

**Cause:** Token expired (tokens expire in 7 days)
**Solution:** Re-login to get a new token

### Tasks not loading

**Cause:** Backend is down or API URL is wrong
**Solution:** Check backend is running and `REACT_APP_API_URL` is correct

### CORS errors

**Cause:** API CORS settings don't allow requests
**Solution:** Check backend CORS configuration

## 🚀 Production Deployment

### Build

```bash
npm run build
```

Creates optimized build in `build/` folder

### Deploy

Options:
- **Vercel** - Easiest for React apps
- **Netlify** - Simple drag-and-drop
- **GitHub Pages** - Free static hosting
- **AWS S3** - Scalable hosting
- **Any static file server**

### Before Deploying

1. Update `REACT_APP_API_URL` to production backend URL
2. Test with production backend
3. Update backend CORS to allow new domain
4. Set secure HTTP-only cookies for tokens (optional)

## 📚 File Descriptions

### src/App.js

Main application component with routing configuration.

**Routes:**
- `/register` - Registration page (public)
- `/login` - Login page (public)
- `/dashboard` - Tasks dashboard (protected)
- `/` - Root (redirects to dashboard or login)

### src/services/api.js

Centralized API communication layer.

**Features:**
- Automatic JWT token inclusion
- Error handling
- Network error detection

### src/utils/auth.js

Authentication utilities for token and user management.

**Functions:**
- `setToken(token)` - Store token
- `getToken()` - Retrieve token
- `isAuthenticated()` - Check auth status
- `logout()` - Clear auth data

## 🎓 Learning Resources

### React Concepts Used

- Functional Components
- Hooks (useState, useEffect)
- React Router
- Form Handling
- API Integration
- Conditional Rendering

### Files to Study

1. Start with `App.js` - Understand routing
2. Check `Dashboard.js` - See how to fetch data
3. Review `api.js` - API communication pattern
4. Look at `Register.js` and `Login.js` - Form handling

## 🔗 Related Documentation

- Backend API: [backend/README.md](../backend/README.md)
- API Testing: [backend/API_TESTING_GUIDE.md](../backend/API_TESTING_GUIDE.md)
- Architecture: [backend/DEVELOPMENT.md](../backend/DEVELOPMENT.md)

## 📝 Notes

- Forms validate input before submission
- Delete requires confirmation to prevent accidents
- Task updates happen immediately in UI
- Logout clears all user data
- Protected routes require authentication

## 🎉 Ready to Run!

```bash
npm install
npm start
```

Happy coding! 💻
