# Running IAMDCS locally in VS Code

## 1. Open the project
- Unzip `iamdcs.zip`
- In VS Code: File → Open Folder → select the `iamdcs` folder

## 2. Backend (Django)
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

## 3. Frontend (React)
Open a SECOND VS Code terminal (keep the backend one running):

    cd frontend
    npm install
    cp .env.example .env
    npm run dev

Frontend runs at http://localhost:5173

## 4. VS Code extensions worth installing
- Python (Microsoft)
- Django (Baptiste Darthenay)
- ES7+ React/Redux snippets
- Tailwind CSS IntelliSense

## 5. Recommended workflow
1. Keep two terminals open side by side — one for backend, one for frontend.
2. Edit `accounts/models.py`, `assets/models.py`, etc. → run
   `python manage.py makemigrations && python manage.py migrate`
3. Edit React pages in `frontend/src/pages/` — Vite hot-reloads automatically.
