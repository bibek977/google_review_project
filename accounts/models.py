from django.db import models
from django.contrib.auth.models import AbstractUser,PermissionsMixin
from .manager import *

class CustomUser(AbstractUser,PermissionsMixin):
    username = None
    phone_number = models.CharField(max_length=20,unique=True)
    email = models.CharField(max_length=50,unique=True)

    USERNAME_FIELD = 'phone_number'
    REQUIRED_FIELDS = ['email']

    objects = UserManager()
    
    def __str__(self):
        return self.phone_number