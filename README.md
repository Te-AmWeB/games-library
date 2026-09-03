# 🎮 Games Library

A full-stack CRUD web application for managing a game catalog. Built as a collaborative project to practice backend development with PostgreSQL and server-side rendering.

---

## 🚀 Tech Stack

Backend
- Node.js
- Express.js
- PostgreSQL
- EJS (templating)

Frontend
- HTML5
- CSS3 (Flexbox, Grid, responsive)
- Vanilla CSS animations

Tools
- Git & GitHub
- Nodemon
- pg (PostgreSQL client)

---

## 📋 Features

- View all games in a clean catalog
- Add new games with title, year, genre, and developer
- View detailed information for each game
- Edit existing game entries
- Delete games with confirmation
- Responsive design (mobile, tablet, desktop)
- Interactive UI with hover and click animations

---

## 🗄️ Database Schema

The project uses a relational PostgreSQL database with three tables:

- genres — id, name
- developers — id, name, country
- games — id, title, year, genre_id (FK), developer_id (FK)

Foreign key constraints ensure data integrity. Deleting a genre or developer sets the corresponding field to NULL in associated games.

---

## 👥 Team

| Role | Age | Focus |
|------|-----|-------|
| Backend Developer | 16 | Node.js, Express, PostgreSQL, Routing, Deployment |
| Frontend Developer | 14 | HTML, CSS, Responsive Design, Animations |

Self-taught developers learning through real projects and daily practice.

---

## 🛠️ Installation

`bash
# Clone the repository
git clone https://github.com/your-username/games-library.git

# Navigate to project folder
cd games-library

# Install dependencies
npm install

# Create a PostgreSQL database named 'games_db'
# Update db/pool.js with your database credentials

# Start the development server
npm run dev
