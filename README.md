# Blogify 📜

A full-stack blogging web application where users can create, edit, and delete blog posts, interact via likes and add friends to collaborate and communicate in real-time via messaging.

![Blogify Logo](./client/public/blogify-logo.png)

---

## 📚 Table of Contents

* [Features](#features)
* [Tech Stack](#tech-stack)
* [Getting Started](#getting-started)
* [Environment Variables](#environment-variables)
* [Folder Structure](#folder-structure)
* [Contributing](#contributing)
* [License](#license)

---

## ✨ Features

* User Authentication (JWT-based)
* Create, edit, and delete blogs
* Like/unlike functionality
* Add and delete comments
* Real-time chat using Socket.io
* Responsive and modern UI
* Protected routes (only logged-in users can access blog features)

---

## 💠 Tech Stack

**Frontend**

* React.js
* Tailwind CSS
* React Router DOM
* Zustand (for state management)
* TanStack Query (React Query)
* Socket.io-client
* Toast notifications (react-hot-toast)

**Backend**

* Node.js
* Express.js
* MongoDB & Mongoose
* Socket.io
* JSON Web Token (JWT)
* bcryptjs

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/AnujGupta-2674/Blogify.git
cd Blogify
```

### 2. Install Dependencies

#### Backend

```bash
cd server
npm install
```

#### Frontend

```bash
cd ../client
npm install
```

### 3. Setup Environment Variables

Create `.env` files in both `/server` and `/client` directories.

#### 📁 `/server/.env`

```env
PORT=5001
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:5173
```

#### 📁 `/client/.env`

```env
VITE_SERVER_URL=http://localhost:5001/api
```

### 4. Run the Application

#### Backend

```bash
cd server
npm run dev
```

#### Frontend

```bash
cd ../client
npm run dev
```

Open `http://localhost:5173` in your browser to access the app.

---

## 📁 Folder Structure

```
Blogify/
├── client/               # React frontend
│   ├── public/           # Static files
│   ├── src/
│   │   ├── components/   # Reusable UI components
│   │   ├── pages/        # Application pages
│   │   ├── hooks/        # Custom hooks
│   │   ├── store/        # Zustand state
│   │   ├── lib/          # API functions
│   │   └── main.jsx      # Entry point
├── server/               # Node/Express backend
│   ├── controllers/      # Route handlers
│   ├── models/           # Mongoose schemas
│   ├── routes/           # API routes
│   ├── middleware/       # Auth, error handlers
│   └── index.js          # Server entry point
```

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create a new branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m "Add feature"`
4. Push to the branch: `git push origin feature-name`
5. Open a pull request

---

## 📄 License

This project is licensed under the [MIT License](./LICENSE).

---

## ✍️ Author

* [Anuj Gupta](https://github.com/AnujGupta-2674)

---
