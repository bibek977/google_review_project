from django.contrib import admin
from django.urls import path,include,re_path

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/',include('show_review.api.urls')),
    path('settings/',include('settings_review.api.urls')),
]
