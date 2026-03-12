# Frontend Testing Guide

Manual testing guide for the Task Manager React frontend.

## 🧪 Testing Workflow

### Prerequisites

1. ✅ Backend API running on `http://localhost:3000`
2. ✅ Frontend running on `http://localhost:3000` (React dev server, usually port 3000)
3. ✅ Browser dev tools open (F12)

## Test Cases

### 1. Registration Tests

#### Test 1.1 - Valid Registration

**Steps:**
1. Navigate to `/register`
2. Fill in form:
   - Name: "John Doe"
   - Email: "john@example.com"
   - Password: "password123"
   - Confirm: "password123"
3. Click "Register"

**Expected:**
- ✅ Redirect to `/dashboard`
- ✅ User can see their name in welcome message
- ✅ Logout button is visible

#### Test 1.2 - Missing Fields

**Steps:**
1. Navigate to `/register`
2. Leave "Name" empty
3. Click "Register"

**Expected:**
- ✅ Error message: "Name is required"
- ✅ No API call is made

#### Test 1.3 - Invalid Email

**Steps:**
1. Navigate to `/register`
2. Fill in:
   - Name: "Jane Doe"
   - Email: "invalid-email"
   - Password: "password123"
   - Confirm: "password123"
3. Click "Register"

**Expected:**
- ✅ Form shows client-side validation (optional, backend validates)
- ✅ Or backend returns error if submitted

#### Test 1.4 - Password Too Short

**Steps:**
1. Navigate to `/register`
2. Fill in:
   - Name: "Bob"
   - Email: "bob@example.com"
   - Password: "123"
   - Confirm: "123"
3. Click "Register"

**Expected:**
- ✅ Error message: "Password must be at least 6 characters"
- ✅ Form is not submitted

#### Test 1.5 - Passwords Don't Match

**Steps:**
1. Navigate to `/register`
2. Fill in:
   - Name: "Alice"
   - Email: "alice@example.com"
   - Password: "password123"
   - Confirm: "different123"
3. Click "Register"

**Expected:**
- ✅ Error message: "Passwords do not match"
- ✅ Form is not submitted

#### Test 1.6 - Email Already Registered

**Steps:**
1. Register with: john@example.com
2. Try to register again with same email
3. Click "Register"

**Expected:**
- ✅ Error message: "Email is already registered"
- ✅ Stay on registration page

---

### 2. Login Tests

#### Test 2.1 - Valid Login

**Steps:**
1. Navigate to `/login`
2. Fill in:
   - Email: "john@example.com"
   - Password: "password123"
3. Click "Login"

**Expected:**
- ✅ Redirect to `/dashboard`
- ✅ Token stored in localStorage
- ✅ Tasks load (initially empty)

**Verify localStorage:**
Open DevTools → Application → localStorage
- ✅ `token` - Contains JWT token
- ✅ `user` - Contains user data

#### Test 2.2 - Invalid Email

**Steps:**
1. Navigate to `/login`
2. Fill in:
   - Email: "nonexistent@example.com"
   - Password: "password123"
3. Click "Login"

**Expected:**
- ✅ Error message: "Invalid email or password"
- ✅ Stay on login page

#### Test 2.3 - Invalid Password

**Steps:**
1. Navigate to `/login`
2. Fill in:
   - Email: "john@example.com"
   - Password: "wrongpassword"
3. Click "Login"

**Expected:**
- ✅ Error message: "Invalid email or password"
- ✅ Stay on login page

#### Test 2.4 - Missing Fields

**Steps:**
1. Navigate to `/login`
2. Leave "Email" empty
3. Click "Login"

**Expected:**
- ✅ Error message: "Email is required"
- ✅ Form is not submitted

#### Test 2.5 - Network Error

**Steps:**
1. Stop backend API
2. Try to login
3. Click "Login"

**Expected:**
- ✅ Error message: "Network error. Is the server running?"
- ✅ Stay on login page

---

### 3. Dashboard Tests

#### Test 3.1 - View Dashboard

**Steps:**
1. Login successfully
2. Verify dashboard loads

**Expected:**
- ✅ Title "Task Manager" is visible
- ✅ Welcome message shows user name
- ✅ Logout button is visible
- ✅ Add task form is visible
- ✅ Task stats show "Total: 0"

#### Test 3.2 - Protected Route

**Steps:**
1. Clear localStorage (DevTools → Application → Clear)
2. Navigate to `/dashboard`

**Expected:**
- ✅ Redirected to `/login`
- ✅ Cannot access dashboard without token

#### Test 3.3 - Auto-redirect When Authenticated

**Steps:**
1. Login successfully
2. Navigate to `/login`

**Expected:**
- ✅ Automatically redirected to `/dashboard`
- ✅ Cannot access login page when authenticated

---

### 4. Task Creation Tests

#### Test 4.1 - Create Task

**Steps:**
1. Be logged in on dashboard
2. Fill in form:
   - Title: "Buy groceries"
   - Description: "Milk, eggs, bread"
3. Click "Add Task"

**Expected:**
- ✅ Task appears in list immediately
- ✅ Checkbox is unchecked
- ✅ Title and description are visible
- ✅ Edit and Delete buttons are visible
- ✅ Task stats update: "Total: 1"
- ✅ Form fields are cleared

#### Test 4.2 - Create Task Without Description

**Steps:**
1. Be logged in on dashboard
2. Fill in form:
   - Title: "Walk the dog"
   - Description: (leave empty)
3. Click "Add Task"

**Expected:**
- ✅ Task is created
- ✅ No description is shown
- ✅ Task is still editable

#### Test 4.3 - Create Task Without Title

**Steps:**
1. Be logged in on dashboard
2. Fill in form:
   - Title: (leave empty)
   - Description: "Some description"
3. Click "Add Task"

**Expected:**
- ✅ Error message: "Task title is required"
- ✅ Form is not submitted

#### Test 4.4 - Create Multiple Tasks

**Steps:**
1. Create task 1: "Task One"
2. Create task 2: "Task Two"
3. Create task 3: "Task Three"

**Expected:**
- ✅ All three tasks appear in list
- ✅ Most recent task is at top
- ✅ Total count shows "Total: 3"

---

### 5. Task Edit Tests

#### Test 5.1 - Edit Task Title

**Steps:**
1. Have a task in list: "Buy groceries"
2. Click "Edit" button
3. Change title to: "Buy groceries and cook"
4. Click "Save"

**Expected:**
- ✅ Task title is updated
- ✅ Form collapses back to view mode
- ✅ Change is reflected on backend (refresh page)

#### Test 5.2 - Edit Task Description

**Steps:**
1. Have a task in list
2. Click "Edit" button
3. Change description to: "Milk, eggs, bread, butter"
4. Click "Save"

**Expected:**
- ✅ Task description is updated
- ✅ Form collapses back to view mode

#### Test 5.3 - Cancel Edit

**Steps:**
1. Have a task in list
2. Click "Edit" button
3. Change title to: "Something new"
4. Click "Cancel"

**Expected:**
- ✅ Form collapses without saving
- ✅ Task title remains unchanged
- ✅ Original data is preserved

#### Test 5.4 - Edit with Empty Title

**Steps:**
1. Have a task in list
2. Click "Edit" button
3. Clear title field
4. Click "Save"

**Expected:**
- ✅ Cannot save empty title
- ✅ Or error message shown

---

### 6. Task Completion Tests

#### Test 6.1 - Mark Task Complete

**Steps:**
1. Have task: "Buy groceries" (unchecked)
2. Click the checkbox

**Expected:**
- ✅ Checkbox becomes checked
- ✅ Task title gets strikethrough style
- ✅ Task becomes slightly transparent
- ✅ Completed count increases: "Completed: 1"
- ✅ Remaining count decreases: "Remaining: 2"

#### Test 6.2 - Unmark Completed Task

**Steps:**
1. Have completed task (checked)
2. Click the checkbox again

**Expected:**
- ✅ Checkbox becomes unchecked
- ✅ Strikethrough is removed
- ✅ Task returns to normal state
- ✅ Counts update correctly

#### Test 6.3 - Multiple Completions

**Steps:**
1. Have 3 tasks total
2. Mark task 1 complete
3. Mark task 2 complete
4. Leave task 3 incomplete

**Expected:**
- ✅ Total: 3, Completed: 2, Remaining: 1
- ✅ Counts reflect actual state

---

### 7. Task Deletion Tests

#### Test 7.1 - Delete Task

**Steps:**
1. Have a task in list
2. Click "Delete" button
3. Confirm deletion in browser dialog

**Expected:**
- ✅ Confirmation dialog appears: "Are you sure you want to delete this task?"
- ✅ Task is removed immediately
- ✅ Task count decreases
- ✅ Future refreshes show it's gone

#### Test 7.2 - Cancel Delete

**Steps:**
1. Have a task in list
2. Click "Delete" button
3. Click "Cancel" in browser dialog

**Expected:**
- ✅ Task remains in list
- ✅ No deletion occurs
- ✅ Can continue working

#### Test 7.3 - Delete All Tasks

**Steps:**
1. Create 3 tasks
2. Delete task 1
3. Delete task 2
4. Delete task 3

**Expected:**
- ✅ All tasks are deleted
- ✅ Empty message appears: "No tasks yet. Create one using the form above!"
- ✅ Total count: 0

---

### 8. Logout Tests

#### Test 8.1 - Logout

**Steps:**
1. Be logged in and on dashboard
2. Click "Logout" button

**Expected:**
- ✅ Redirect to `/login`
- ✅ localStorage token is cleared
- ✅ localStorage user is cleared
- ✅ Cannot access dashboard without re-login

#### Test 8.2 - Session Persistence

**Steps:**
1. Login successfully
2. Refresh the page

**Expected:**
- ✅ Stay on dashboard
- ✅ Tasks still load
- ✅ User data still visible
- ✅ Session is preserved

---

### 9. Error Handling Tests

#### Test 9.1 - Backend Down

**Steps:**
1. Stop backend API
2. Try to create a task

**Expected:**
- ✅ Error message: "Network error. Is the server running?"
- ✅ Task is not created

#### Test 9.2 - Invalid Token

**Steps:**
1. Login and get token
2. Manually change token in localStorage
3. Try to perform action (e.g., create task)

**Expected:**
- ✅ Error occurs (401 Unauthorized)
- ✅ Logout is triggered
- ✅ Redirected to login

#### Test 9.3 - Server Error

**Steps:**
1. Cause a server error (backend logs)
2. Observe frontend behavior

**Expected:**
- ✅ Error message is shown
- ✅ App remains functional
- ✅ Can retry operation

---

### 10. Responsive Design Tests

#### Test 10.1 - Mobile View

**Steps:**
1. Open DevTools (F12)
2. Toggle device toolbar (Ctrl+Shift+M)
3. Select iPhone 12

**Expected:**
- ✅ App adapts to narrow screen
- ✅ Buttons are still clickable
- ✅ Text is readable
- ✅ No horizontal scrolling

#### Test 10.2 - Tablet View

**Steps:**
1. Toggle device toolbar
2. Select iPad

**Expected:**
- ✅ App looks good on tablet size
- ✅ Form width is reasonable
- ✅ Task list is readable

---

## 📊 Test Summary

| Category | Tests | Status |
|----------|-------|--------|
| Registration | 6 | ✓ |
| Login | 5 | ✓ |
| Dashboard | 3 | ✓ |
| Task Create | 4 | ✓ |
| Task Edit | 4 | ✓ |
| Task Complete | 3 | ✓ |
| Task Delete | 3 | ✓ |
| Logout | 2 | ✓ |
| Error Handling | 3 | ✓ |
| Responsive | 2 | ✓ |
| **TOTAL** | **35** | ✓ |

## ✅ Checklist

Before considering the frontend production-ready:

- [ ] All 35 tests pass
- [ ] No console errors
- [ ] No unhandled promise rejections
- [ ] Mobile responsive works
- [ ] Form validation works
- [ ] Error messages are clear
- [ ] Loading states show
- [ ] Token management works
- [ ] Protected routes work
- [ ] Auto-redirect works

## 🚀 Common Testing Tips

1. **Use Browser DevTools**
   - Check Network tab for API calls
   - Check Application tab for localStorage
   - Check Console for errors

2. **Test on Real Mobile**
   - Use same WiFi as computer
   - Visit `http://<your-ip>:3000`
   - Test touch interactions

3. **Clear Cache When Needed**
   - DevTools → Application → Clear site data
   - Or use incognito/private mode

4. **Test Edge Cases**
   - Very long task titles
   - Special characters in text
   - Rapid clicks
   - Network disconnect

5. **Check Performance**
   - DevTools → Performance tab
   - Monitor for slowness
   - Check for memory leaks

---

**Happy Testing! 🧪**
