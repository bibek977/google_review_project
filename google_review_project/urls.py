from django.contrib import admin
from django.urls import path,include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('',include('show_review.api.urls')),
    path('settings/',include('settings_review.api.urls'))
]
