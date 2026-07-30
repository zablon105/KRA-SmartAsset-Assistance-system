# IAMDCS — ICT Asset Management & Digital Clearance System (Phase 1)

ICT-only MVP: laptops, mini desktops, Cisco phones, monitors, MiFis, VPN tokens, keyboards, mice.

## Structure
- `backend/` — Django + DRF API (accounts, assets, clearance, maintenance apps)
- `frontend/` — React (Vite) + Tailwind CSS

## Quick start
See `SETUP.md` for full run instructions.

Backend:
    cd backend
    python3 -m venv venv
    source venv/bin/activate   (Windows: venv\Scripts\activate)
    pip install -r requirements.txt
    cp .env.example .env
    python manage.py migrate
    python manage.py createsuperuser
    python manage.py runserver

Frontend:
    cd frontend
    npm install
    cp .env.example .env
    npm run dev
