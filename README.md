# HD-hub 🎬

A movie streaming platform frontend built with React + Vite, backed by a Node.js/Express REST API with SQLite for persistent storage.

## Tech Stack

| Layer      | Technology                              |
|------------|-----------------------------------------|
| Frontend   | React 19, Vite, React Router v7         |
| Backend    | Node.js, Express 4                      |
| Database   | SQLite (via `better-sqlite3`)           |
| Auth       | JWT (`jsonwebtoken`) + bcrypt passwords |
| Movie Data | TMDB API                                |

## Project Structure

```
project/
├── src/                      # React frontend (Vite)
│   ├── context/
│   │   └── authContext.jsx   # Auth state + API calls
│   ├── pages/
│   │   └── Login.jsx         # Sign in / Register UI
│   └── services/api.js       # TMDB API helpers
└── backend/                  # Express API
    ├── src/
    │   ├── db/database.js    # SQLite schema + connection
    │   ├── middleware/auth.js # JWT verification
    │   ├── routes/auth.js    # /api/auth/*
    │   ├── routes/users.js   # /api/users/*
    │   └── index.js          # Server entry point
    └── .env
```

## Setup Instructions

### 1. Frontend

```bash
# From project root
npm install        # or: pnpm install
npm run dev        # http://localhost:5173
```

### 2. Backend

```bash
cd backend
npm install
npm run dev        # http://localhost:5000
```

> Vite proxies `/api` → `http://localhost:5000` in dev mode automatically.

### Environment Variables

**`backend/.env`**
```
PORT=5000
JWT_SECRET=change_this_before_deploying
JWT_EXPIRES_IN=7d
DB_PATH=./data/streamvault.db
```

**`.env`** (frontend root)
```
VITE_API_URL=/api
```

## API Endpoints

### Auth
| Method | Path                 | Auth | Description       |
|--------|----------------------|------|-------------------|
| POST   | `/api/auth/register` | No   | Create account    |
| POST   | `/api/auth/login`    | No   | Login → JWT token |
| GET    | `/api/auth/me`       | Yes  | Get current user  |

### Users
| Method | Path                       | Auth | Description          |
|--------|----------------------------|------|----------------------|
| GET    | `/api/users/me`            | Yes  | Get profile          |
| PATCH  | `/api/users/me`            | Yes  | Update name/password |
| GET    | `/api/users/watchlist`     | Yes  | Get watchlist        |
| POST   | `/api/users/watchlist`     | Yes  | Add to watchlist     |
| DELETE | `/api/users/watchlist/:id` | Yes  | Remove from watchlist|
| GET    | `/api/users/history`       | Yes  | Watch history        |
| POST   | `/api/users/history`       | Yes  | Log watched movie    |

## Database Schema

```sql
users         (id, name, email, password[bcrypt], plan, created_at)
watchlist     (id, user_id→users, movie_id, title, poster_path, added_at)
watch_history (id, user_id→users, movie_id, title, poster_path, watched_at)
```

## Deployment

1. Deploy backend to **Railway / Render / Fly.io** — set `JWT_SECRET` + `FRONTEND_URL`
2. Deploy frontend to **Vercel / Netlify** — set `VITE_API_URL=https://your-api.railway.app/api`

## Live URL

_Add deployed URL here._
