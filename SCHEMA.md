# Database Schemas

This document outlines the Mongoose models used in the BookReviewAPI project.

---

## 👤 User Model

| Field     | Type    | Description                      |
|-----------|---------|----------------------------------|
| username  | String  | Unique username (required)       |
| password  | String  | Hashed password for authentication |

---

## 📚 Book Model

| Field     | Type    | Description                       |
|-----------|---------|-----------------------------------|
| title     | String  | Title of the book (required)      |
| author    | String  | Author of the book (required)     |
| isbn      | String  | Unique ISBN (required, unique)    |
| reviews   | Array   | List of embedded review objects   |

### 🔍 Review Subdocument (Embedded in Book)

| Field     | Type      | Description                                |
|-----------|-----------|--------------------------------------------|
| user      | ObjectId  | Reference to the User who wrote the review |
| content   | String    | Text content of the review                 |
| rating    | Number    | Rating between 1 to 5                      |
