# Task Manager - Full Stack 🐳

[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)  
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)  
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)  
[![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)  
[![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io/)  

A full stack task manager application with authentication and task management, now **dockerized** for easy setup! 🐳

---

## 🚀 Features

- User registration  
- User login with JWT authentication  
- Create, update, delete, and complete tasks  
- Task statistics dashboard  
- **Runs locally using Docker containers** 🐳

---

## 🧰 Technologies

**Backend:**  
- Node.js  
- Express  
- PostgreSQL  
- Prisma ORM  
- JWT Authentication  

**Frontend:**  
- React  
- JavaScript  
- CSS  

**DevOps / Containerization:**  
- Docker (backend, frontend, PostgreSQL containers) 🐳  

---

## 📁 Project Structure

task-manager
│
├── backend
│ ├── controllers
│ ├── routes
│ ├── services
│ ├── middleware
│ └── prisma
│
└── frontend
├── components
├── pages
└── services
---

## ⚡ Installation & Running with Docker

1. Clone the repository:

bash
git clone https://github.com/CalimanMateus/task-manager.git
cd task-manager

Build and run the containers:

docker-compose up --build

Access the application:

Frontend: http://localhost:3000

Backend API: http://localhost:3001

PostgreSQL runs in its container

📝 Notes

No need to install Node.js, PostgreSQL, or other dependencies locally.

Just Docker and Docker Compose are required.

Feedback and contributions are welcome! 🚀

