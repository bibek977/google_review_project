release: python manage.py migrate
web: gunicorn --error-logfile /logs/error.log --log-file /logs/access.log google_review_project.wsgi
