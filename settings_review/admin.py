from django.contrib import admin
from .models import *

class PreviewAdmin(admin.ModelAdmin):
    list_display = ['id','preview_id']

admin.site.register(Preview,PreviewAdmin)

class SettingsAdmin(admin.ModelAdmin):
    list_display = ['id','align']

admin.site.register(SettingsPreview,SettingsAdmin)