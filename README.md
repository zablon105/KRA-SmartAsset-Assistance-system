# KRA SmartAsset Assistance System

An ICT Asset Management & Digital Clearance system for Kenya Revenue Authority (KRA). This repository contains a Django backend and a React (Vite) frontend. The project provides asset inventory, assignment, maintenance, and employee clearance flows with AI-driven recommendations and administrative dashboards.

---

## Key Features

- User roles: admin, officer, employee
- Asset registration, assignment, history and AI recommendations
- Maintenance tickets and audit logs
- Clearance requests and certificate generation
- Authentication, password reset (email-based) and user management
- Seed data generator for demo accounts and assets

---

## Tech Stack

- Backend: Python, Django, Django REST Framework
- Frontend: React, Vite, Tailwind CSS
- Database: SQLite (development) — production DB recommended (Postgres)
- Dev tooling: npm, pip

---

## Repository Layout

- `backend/` — Django project and apps (accounts, assets, clearance, maintenance, etc.)
- `frontend/` — React frontend (Vite)
- `backend/management/commands/seed_data.py` — seeds demo users, assets and workflows
- `backend/scripts/verify_users.py` — helper script to list DB users

---

## Quickstart (development)

Prerequisites:

- Python 3.10+ (or compatible)
- Node 18+ / npm
- Git

Backend (Windows example):

```powershell
cd D:\iamdcs\backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
# create .env with your secrets or copy from .env.example if provided
python manage.py migrate
python manage.py seed_data   # creates demo users & demo assets
python manage.py runserver
```

Frontend:

```powershell
cd D:\iamdcs\frontend
npm install
npm run dev
# or build for production
npm run build
```

Open the frontend dev URL (shown by Vite) and the backend API at `http://127.0.0.1:8000`.

---

## Environment variables

Put sensitive values in `backend/.env` and `frontend/.env` (these are listed in `.gitignore`). Important keys include:

- `BACKEND_SECRET_KEY` (Django SECRET_KEY)
- `DATABASE_URL` (optional for non-SQLite)
- `DEFAULT_FROM_EMAIL` and other email settings
- `FRONTEND_URL` — used to build password reset links
- Frontend: any API base URL overrides if needed

The repository includes example `.gitignore` entries to exclude `.env` files.

---

## Password reset flow

- The backend implements a password reset request and confirmation API (uses Django's `default_token_generator`). The reset email contains a frontend URL in the form:

```
{FRONTEND_URL}/reset-password/{uid}/{token}
```

- Email delivery is configured via Django `EMAIL_BACKEND`; the project references Resend in comments. Set appropriate SMTP/Resend credentials in `backend/.env`.

---

## Demo accounts (seeded)

Seed creates sample accounts for quick testing (password in seed script: `password123`):

- Admin: username `jmwangi` — john.mwangi@kra.go.ke
- Officer: username `jwanjiku` — jane.wanjiku@kra.go.ke
- Employee: username `amwangi` — abel.mwangi@kra.go.ke

Change these passwords before any public deployment.

---

## Running tests & linting

- Backend: add Django tests and run `python manage.py test`
- Frontend: add unit/CI tests as needed (Jest, Vitest)

---

## Deployment notes

- Use a production-ready database (Postgres) and configure `DATABASE_URL`.
- Ensure `DEBUG=False`, secure `SECRET_KEY`, and proper `ALLOWED_HOSTS`.
- Configure email provider (SMTP or Resend) and `DEFAULT_FROM_EMAIL`.
- Build frontend and serve static files via CDN or the web server.

---

## Contributing

1. Fork the repo and create a feature branch.
2. Run tests and linters locally.
3. Open a PR describing changes.

---

## License & Contact

This repository is provided as-is. Add a license file if you intend to publish under a specific license.

For questions, reach out to the project owner or open an issue on GitHub.
