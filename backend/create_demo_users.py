#!/usr/bin/env python
"""
Create demo users for the KRA SmartAsset system.
Run with: python manage.py shell < create_demo_users.py
"""
import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from django.contrib.auth import get_user_model

User = get_user_model()

# Demo users to create
demo_users = [
    {
        'username': 'jmwangi',
        'email': 'john.mwangi@kra.go.ke',
        'password': 'password123',
        'role': 'admin',
        'first_name': 'John',
        'last_name': 'Mwangi',
        'is_staff': True,
        'is_superuser': True,
    },
    {
        'username': 'jwanjiku',
        'email': 'jane.wanjiku@kra.go.ke',
        'password': 'password123',
        'role': 'officer',
        'first_name': 'Jane',
        'last_name': 'Wanjiku',
    },
    {
        'username': 'jkamau',
        'email': 'john.kamau@kra.go.ke',
        'password': 'password123',
        'role': 'employee',
        'first_name': 'John',
        'last_name': 'Kamau',
    },
    {
        'username': 'amwangi',
        'email': 'abel.mwangi@kra.go.ke',
        'password': 'password123',
        'role': 'employee',
        'first_name': 'Abel',
        'last_name': 'Mwangi',
    },
    {
        'username': 'gotieno',
        'email': 'grace.otieno@kra.go.ke',
        'password': 'password123',
        'role': 'employee',
        'first_name': 'Grace',
        'last_name': 'Otieno',
    },
    {
        'username': 'mwanjiku',
        'email': 'mercy.wanjiku@kra.go.ke',
        'password': 'password123',
        'role': 'employee',
        'first_name': 'Mercy',
        'last_name': 'Wanjiku',
    },
]

print("Creating demo users...")
for user_data in demo_users:
    username = user_data.pop('username')
    email = user_data.pop('email')
    password = user_data.pop('password')
    
    # Check if user already exists
    if User.objects.filter(username=username).exists():
        print(f"✓ User '{username}' already exists - skipping")
        continue
    
    try:
        user = User.objects.create_user(
            username=username,
            email=email,
            password=password,
            **user_data
        )
        print(f"✓ Created user: {username} ({user_data.get('role', 'N/A')}) - {email}")
    except Exception as e:
        print(f"✗ Failed to create user '{username}': {str(e)}")

print("\nDemo users created successfully!")
print("\nLogin credentials:")
print("  Admin:    jmwangi / password123")
print("  Officer:  jwanjiku / password123")
print("  Employee: jkamau / password123")
