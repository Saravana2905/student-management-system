## 📘 Student Management System

A basic CRUD application for managing student data using Node.js, Express, Sequelize, and MySQL. It supports full Create, Read, Update, and Delete operations through RESTful APIs.

---

## 🚀 Features

- Create new students
- Retrieve all students or a specific student by ID
- Update student details
- Delete student records
- Field validation (name, email, age)
- Modular code structure (routes, controllers, configs)

---

## 🧰 Tech Stack

| Layer       | Technology             |
|-------------|------------------------|
| Backend     | Node.js, Express.js     |
| Database    | MySQL + Sequelize ORM   |
| Dev Tools   | Nodemon, Postman        |
| Environment | dotenv                  |

---

## 📦 Installation

```bash
git clone https://github.com/saravana2905/student-management-system.git
cd student-management-system
npm install
```

Create a `.env` file in the root directory:

```
DB_NAME=student_db
DB_USER=root
DB_PASSWORD=yourpassword
DB_HOST=localhost
PORT=3000
```

---

## 🧪 Run the App

```bash
npm run dev
```

Server will start on `http://localhost:3000` and sync the database using Sequelize.

---

## 🔀 API Endpoints

| Method | Endpoint           | Description               |
|--------|--------------------|---------------------------|
| POST   | `/students`        | Create a new student      |
| GET    | `/students`        | Get all students          |
| GET    | `/students/:id`    | Get student by ID         |
| PUT    | `/students/:id`    | Update student details    |
| DELETE | `/students/:id`    | Delete student            |

---

## 📋 Validation Rules

- `name`: required
- `email`: required, must be valid
- `age`: required
- `department`: required

Returns appropriate HTTP status codes for success or error responses.

---

## 🛠️ Testing with Postman

Import this Postman collection to test all endpoints:  
👉 [Student Management Postman Collection](https://good33-0086.postman.co/workspace/Student-Management-System-(CRUD~fe3633b9-52ce-44e2-9dc3-51613f1a780b/collection/37807764-638e9b4a-75c4-42a4-8852-3ad65daf6d1d?action=share&source=copy-link&creator=37807764)

Use JSON format and include headers:

```
Content-Type: application/json
```

---

## 🗂️ Folder Structure

```
├── config/             → DB configuration
├── controllers/        → Logic for API routes
├── models/             → Sequelize models
├── routes/             → Route definitions
├── server.js           → Entry point
├── .env                → Environment variables
```

---

## 📬 Contact

**Saravanabalaji**  
💼 Backend & Frontend Developer  
📧 dsbalaji2001@gmail.com  
🌐 [GitHub Profile](https://github.com/saravana2905)

---

