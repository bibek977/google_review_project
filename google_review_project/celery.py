import os
from celery import Celery
from celery import shared_task

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'google_review_project.settings')

app = Celery('google_review_project')

app.config_from_object('django.conf:settings', namespace='CELERY')

app.autodiscover_tasks()

@app.task
def settings_save(x,y):
    return x + y

@shared_task
def fetch_review(c):
    company_details = {
    'image' : c.getPhoto(),
    'company' : c.getName(),
    'rating' : c.getRating(),
    'reviews' : c.getReviews(),
    'details' : c.getOfficeData()
    }

    return company_details

@shared_task
def fetch_review_all(c,company_id):
    r = c.reviewRelevant(company_id)
    return r

@shared_task
def fetch_search_place(d,title):
    r = d.get_search(title)
    return r
