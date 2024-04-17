from django.contrib import admin
from .models import *

class CompanyNameAdmin(admin.ModelAdmin):
    model = CompanyName
    list_display = ['id','company','rating','reviews']

class ReviewsAdmin(admin.ModelAdmin):
    model = Reviews
    list_display = ['id','name','rate']

admin.site.register(CompanyName,CompanyNameAdmin)
admin.site.register(Reviews,ReviewsAdmin)