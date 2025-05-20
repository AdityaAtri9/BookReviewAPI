# BookReviewAPI

A simple RESTful API for managing books and their reviews using Node.js, Express, and MongoDB Atlas.

## 📦 Project Structure

- `models/` – Mongoose schemas for Books and Reviews
- `routes/` – API route handlers
- `middleware/` – Authentication middleware (JWT-based)
- `app.js` – Entry point
- `.env` – Environment variables (not committed)
- `README.md` – Project overview
- `schema.md` – Database schema

## 🚀 Setup Instructions

### 1. Clone the Repository
(If you haven't uploaded yet, skip this step)

```
git clone https://github.com/AdityaAtri9/BookReviewAPI.git
cd BookReviewAPI
```

### 2. Install Dependencies

```
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root with the following content:

```
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=3000
```

### 4. Run the Project Locally

```
npm start
```

## 📬 API Endpoints

### Books

- `POST /books` – Add a book (auth required)
- `GET /books` – List all books with pagination  
  - Query Parameters:
    - `page` (optional, default: 1)
    - `limit` (optional, default: 10)
- `GET /books/:isbn` – Get book by ISBN
- `GET /books/search?q=Clean` – Search by title or author

### Reviews

- `POST /books/:isbn/reviews` – Add a review (auth required)
- `GET /books/:isbn/reviews` – Get all reviews for a book
- `PUT /reviews/:id` – Update your own review (auth required)
- `DELETE /reviews/:id` – Delete your own review (auth required)

## 🧠 Assumptions / Design Decisions

- JWT-based authentication is used.
- MongoDB Atlas is used for scalable cloud storage.
- User info is inferred from `req.userId` after JWT middleware.
- Searching is partial and case-insensitive.

## 🛠 Tools

- Node.js
- Express.js
- MongoDB Atlas + Mongoose
- Postman (used for testing)
