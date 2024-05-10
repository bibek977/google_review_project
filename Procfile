web: gunicorn google_review_project.wsgi:application --log-file - --log-level debug
worker: celery -A google_review_project worker -l info
worker2: celery -A google_review_project worker -l info