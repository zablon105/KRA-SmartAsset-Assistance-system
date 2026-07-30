import os
import sys
import django

# Ensure backend package (where `config` lives) is importable
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from django.contrib.auth import get_user_model
User = get_user_model()

users = User.objects.all().order_by('username')
print('username | email | role | is_staff | is_superuser')
for u in users:
    role = getattr(u, 'role', None)
    print(f"{u.username} | {u.email or ''} | {role} | {u.is_staff} | {u.is_superuser}")
