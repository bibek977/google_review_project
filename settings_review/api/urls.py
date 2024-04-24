from django.urls import path
from .views import *

urlpatterns = [
    path('preview/',PreviewApi.as_view(),name="preview"),
    path('',SettingsApi.as_view(),name="settings")
]
