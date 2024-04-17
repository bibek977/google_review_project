from django.contrib import admin
from .models import *

class CustomUserAdmin(admin.ModelAdmin):
    model = CustomUser
    list_display = ['phone_number','email']

admin.site.register(CustomUser,CustomUserAdmin)
