# Generated by Django 5.0.3 on 2024-03-15 07:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0002_auth'),
    ]

    operations = [
        migrations.CreateModel(
            name='Event',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=100)),
                ('summary', models.CharField(max_length=1000)),
                ('time', models.DateField()),
                ('location', models.CharField(max_length=60)),
                ('image', models.ImageField(upload_to='')),
                ('is_liked', models.BooleanField(default=False)),
                ('user', models.EmailField(max_length=60)),
            ],
        ),
    ]
