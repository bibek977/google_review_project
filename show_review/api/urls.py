from django.urls import path
from .views import *

urlpatterns = [
    path('',ReviewApi.as_view(),name="review_api")
]
