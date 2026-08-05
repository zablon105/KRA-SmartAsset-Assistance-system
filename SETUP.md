# KRA SmartAsset Assistance System (IAMDCS) - Setup & Deployment Guide

## Production Deployment ✅

The application is now deployed and running on production:

- **Frontend**: https://kra-smart-asset-assistance-system-q.vercel.app (Vercel)
- **Backend API**: https://kra-smartasset-assistance-system.onrender.com/api (Render)
- **Database**: Neon PostgreSQL (Production)

### Demo Login Credentials

| Username | Email | Password | Role |
|----------|-------|----------|------|
| `jmwangi` | john.mwangi@kra.go.ke | `password123` | Admin |
| `jwanjiku` | jane.wanjiku@kra.go.ke | `password123` | Officer |
| `jkamau` | john.kamau@kra.go.ke | `password123` | Employee |
| `amwangi` | abel.mwangi@kra.go.ke | `password123` | Employee |
| `gotieno` | grace.otieno@kra.go.ke | `password123` | Employee |
| `mwanjiku` | mercy.wanjiku@kra.go.ke | `password123` | Employee |

All dashboards now require authentication. Log in at: https://kra-smart-asset-assistance-system-q.vercel.app/login

---

## Local Development Setup

### 1. Open the project
- Clone or unzip the `iamdcs` project
- In VS Code: File → Open Folder → select the `iamdcs` folder

### 2. Backend (Django)
Open a VS Code terminal (Terminal → New Terminal):

    cd backend
    python3 -m venv venv

Activate it:
- macOS/Linux: `source venv/bin/activate`
- Windows:     `venv\Scripts\activate`

Then:

    pip install -r requirements.txt
    cp .env.example .env
    python manage.py migrate
    python manage.py createsuperuser
    python manage.py runserver

Backend runs at http://127.0.0.1:8000
Django admin at http://127.0.0.1:8000/admin

The project uses local SQLite by default so it runs immediately.
When you're ready to connect Supabase, edit `.env`: set `USE_POSTGRES=True`
and fill in DB_NAME/DB_USER/DB_PASSWORD/DB_HOST from your Supabase project
settings, then re-run `python manage.py migrate`.

### 3. Frontend (React)
Open a SECOND VS Code terminal (keep the backend one running):

    cd frontend
    npm install
    cp .env.example .env
    npm run dev

Frontend runs at http://localhost:5173

### 4. VS Code extensions worth installing
- Python (Microsoft)
- Django (Baptiste Darthenay)
- ES7+ React/Redux snippets
- Tailwind CSS IntelliSense

### 5. Recommended workflow
1. Keep two terminals open side by side — one for backend, one for frontend.
2. Edit `accounts/models.py`, `assets/models.py`, etc. → run
   `python manage.py makemigrations && python manage.py migrate`
3. Edit React pages in `frontend/src/pages/` — Vite hot-reloads automatically.

---

## Environment Variables & Production Configuration

### Backend (.env)

**Local Development:**
```
DEBUG=True
ALLOWED_HOSTS=127.0.0.1,localhost
DATABASE_URL=postgresql://user:password@localhost:5432/iamdcs
CORS_ALLOWED_ORIGINS=http://localhost:5173
SECRET_KEY=your-secret-key-here
```

**Production (Render):**
```
DEBUG=False
ALLOWED_HOSTS=kra-smartasset-assistance-system.onrender.com
DATABASE_URL=postgresql://neondb_owner:password@ep-xxx.us-east-2.aws.neon.tech/neondb?sslmode=require
CORS_ALLOWED_ORIGINS=https://kra-smart-asset-assistance-system-q.vercel.app
SECRET_KEY=<secure-production-key>
```

### Frontend (.env)

**Local Development:**
```
VITE_API_BASE_URL=http://localhost:8000/api
```

**Production:**
```
VITE_API_BASE_URL=https://kra-smartasset-assistance-system.onrender.com/api
```

### Important Notes

- **Neon Database**: Production uses Neon PostgreSQL. Connection requires `sslmode=require` parameter
- **CORS**: Must be configured to match frontend domain exactly (with https://)
- **ALLOWED_HOSTS**: Render domain WITHOUT https:// prefix
- **SQLite**: Local development uses SQLite by default; change DATABASE_URL to PostgreSQL when needed

---

## Deployment Checklist

✅ Backend deployed on Render  
✅ Frontend deployed on Vercel  
✅ Database migrated to Neon PostgreSQL  
✅ Demo users created and accessible  
✅ All dashboards require authentication  
✅ Environment variables configured on Render and Vercel  
✅ CORS and ALLOWED_HOSTS properly configured  

---

## Troubleshooting

**SSL Connection Errors**: Ensure DATABASE_URL uses `sslmode=require` (not `channel_binding=require`)

**CORS Errors**: Verify CORS_ALLOWED_ORIGINS matches your frontend domain exactly with https://

**401 Unauthorized**: Log in with demo credentials at `/login`

**Database Connection**: For local development, adjust DATABASE_URL in .env to match your local PostgreSQL setup
