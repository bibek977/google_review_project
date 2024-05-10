from django.contrib import admin
from django.urls import path,include,re_path
from .views import *
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/',include('show_review.api.urls')),
    path('settings/',include('settings_review.api.urls')),
    path('', index,name='index')
]

urlpatterns += static(settings.STATIC_URL,document_root=settings.STATIC_ROOT)
urlpatterns += static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT)