from django.urls import path
from .views import *

urlpatterns = [
    path('',ReviewApi.as_view(),name="review_api"),
    path('search/',SearchDataApi.as_view(),name='search_title'),
    path('connect/',SearchComapanyApi.as_view(),name='connect_company'),
    path('connect/review/',SearchReviewApi.as_view(),name='connect_review'),
    path('disconnect/',DisconnectCompanyApi.as_view(),name='disconnect_company'),
]
