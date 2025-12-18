# 📝 Notes Web Application

🔗 Live Demo: https://noteswebapp-pwm2.onrender.com/

A simple full-stack **Notes Web Application** that allows users to create, view, update, and delete notes. This project demonstrates backend API development, database integration, and deployment of a web application.

---

## 🚀 Features

- Create, read, update, and delete notes (CRUD operations)
- Clean and simple user interface
- Persistent data storage using MongoDB
- RESTful API design
- Deployed and accessible online

---

## 🛠️ Tech Stack

**Frontend**
- HTML
- CSS
- JavaScript

**Backend**
- Node.js
- Express.js

**Database**
- MongoDB (MongoDB Atlas)

**Deployment**
- Render

---


---

## 🔗 API Endpoints

| Method | Endpoint           | Description            |
|------|--------------------|------------------------|
| GET  | /api/notes         | Get all notes          |
| POST | /api/notes         | Create a new note      |
| PUT  | /api/notes/:id     | Update an existing note|
| DELETE | /api/notes/:id   | Delete a note          |

---

## ⚙️ How the Application Works

1. The frontend sends HTTP requests to the backend using JavaScript.
2. Express routes handle the requests and interact with MongoDB.
3. Notes data is stored and retrieved from the database.
4. The UI updates dynamically based on API responses.

---

## 🧪 Run Locally

### Prerequisites
- Node.js
- npm
- MongoDB (local or Atlas)

### Steps

1. Clone the repository
git clone https://github.com/Hemanth42d/NotesWebApp.git \n
cd NotesWebApp
### 2. Install Dependencies

Install all required project dependencies using npm:

```bash
npm install
```
3. Configure Environment Variables
   ```bash
   MONGO_URI=your_mongodb_connection_string
   PORT=5000
   ```
4. Start the Application

Start the application using the following command:

npm start

Once the server is running, open your browser and navigate to:

http://localhost:5000

5. Access the Deployed Application

You can also access the live deployed version of the application here:

🔗 https://noteswebapp-pwm2.onrender.com/

## 📂 Project Structure

