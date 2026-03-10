# API Testing Guide

This guide provides curl commands to test all API endpoints.

## Prerequisites

1. Server running on `http://localhost:3000`
2. Replace `<jwt_token>` with the actual token from login/register response
3. Replace `<task_id>` with actual task IDs from your database

## Health Check

```bash
curl -X GET http://localhost:3000/health
```

## Authentication Endpoints

### Register a New User

```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": "...",
      "name": "John Doe",
      "email": "john@example.com"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

Save the token from the response for use in authenticated requests.

### Login User

```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

## User Endpoints (Requires Authentication)

### Get User Profile

```bash
curl -X GET http://localhost:3000/users/profile \
  -H "Authorization: Bearer <jwt_token>"
```

## Task Endpoints (Requires Authentication)

### Create a Task

```bash
curl -X POST http://localhost:3000/tasks \
  -H "Authorization: Bearer <jwt_token>" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Buy groceries",
    "description": "Milk, eggs, bread"
  }'
```

### Get All Tasks

```bash
curl -X GET http://localhost:3000/tasks \
  -H "Authorization: Bearer <jwt_token>"
```

### Get Specific Task

```bash
curl -X GET http://localhost:3000/tasks/<task_id> \
  -H "Authorization: Bearer <jwt_token>"
```

### Update a Task

```bash
curl -X PUT http://localhost:3000/tasks/<task_id> \
  -H "Authorization: Bearer <jwt_token>" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Buy groceries and cook dinner",
    "description": "Milk, eggs, bread, and prepare dinner"
  }'
```

### Mark Task as Complete

```bash
curl -X PATCH http://localhost:3000/tasks/<task_id>/complete \
  -H "Authorization: Bearer <jwt_token>"
```

### Delete a Task

```bash
curl -X DELETE http://localhost:3000/tasks/<task_id> \
  -H "Authorization: Bearer <jwt_token>"
```

## Testing Workflow

### Step 1: Register a User

```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "test123456"
  }'
```

Copy the `token` from the response.

### Step 2: Get Your Profile

```bash
curl -X GET http://localhost:3000/users/profile \
  -H "Authorization: Bearer <paste_token_here>"
```

### Step 3: Create a Task

```bash
curl -X POST http://localhost:3000/tasks \
  -H "Authorization: Bearer <paste_token_here>" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Learn Node.js",
    "description": "Complete Node.js tutorial course"
  }'
```

Copy the task `id` from the response.

### Step 4: Get All Tasks

```bash
curl -X GET http://localhost:3000/tasks \
  -H "Authorization: Bearer <paste_token_here>"
```

### Step 5: Update the Task

```bash
curl -X PUT http://localhost:3000/tasks/<paste_task_id> \
  -H "Authorization: Bearer <paste_token_here>" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Learn Node.js and Express",
    "description": "Complete Node.js and Express tutorial course"
  }'
```

### Step 6: Complete the Task

```bash
curl -X PATCH http://localhost:3000/tasks/<paste_task_id>/complete \
  -H "Authorization: Bearer <paste_token_here>"
```

### Step 7: Delete the Task

```bash
curl -X DELETE http://localhost:3000/tasks/<paste_task_id> \
  -H "Authorization: Bearer <paste_token_here>"
```

## Error Cases to Test

### 1. Missing Required Fields

```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John"
  }'
```

Expected: 400 Bad Request

### 2. Invalid Email Format

```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "invalid-email",
    "password": "password123"
  }'
```

Expected: 400 Bad Request

### 3. Password Too Short

```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "123"
  }'
```

Expected: 400 Bad Request

### 4. Email Already Exists

Register with the same email twice:

```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "duplicate@example.com",
    "password": "password123"
  }'
```

Run the same command again.

Expected: 409 Conflict

### 5. Invalid Credentials

```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "wrong@example.com",
    "password": "wrongpassword"
  }'
```

Expected: 401 Unauthorized

### 6. Missing Authentication Token

```bash
curl -X GET http://localhost:3000/users/profile
```

Expected: 401 Unauthorized

### 7. Invalid Token

```bash
curl -X GET http://localhost:3000/users/profile \
  -H "Authorization: Bearer invalid_token_here"
```

Expected: 403 Forbidden

### 8. Access Another User's Task

1. Register User A and create a task
2. Register User B and try to access User A's task:

```bash
curl -X GET http://localhost:3000/tasks/<user_a_task_id> \
  -H "Authorization: Bearer <user_b_token>"
```

Expected: 403 Forbidden

## Tips

- Use tools like Postman, Insomnia, or VS Code REST Client for easier testing
- Keep your JWT token in a variable for reuse
- Always include proper headers and content types
- Check the response status codes to verify expected behavior
- For production, always use HTTPS instead of HTTP
