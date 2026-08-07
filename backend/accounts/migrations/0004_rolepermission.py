from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("accounts", "0003_user_profile_image"),
    ]

    operations = [
        migrations.CreateModel(
            name="RolePermission",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("role", models.CharField(max_length=30, unique=True, choices=[
                    ("admin", "System Administrator"),
                    ("officer", "ICT Officer"),
                    ("employee", "Tax / Customs Employee"),
                    ("auditor", "Auditor / Compliance"),
                ])),
                ("permissions", models.TextField(blank=True, default="")),
            ],
        ),
    ]
