from django.db import models
import uuid
from django.contrib.postgres.fields import ArrayField

class BaseModel(models.Model):
    # id = models.UUIDField(primary_key=True,editable=False,default=uuid.uuid4)
    id = models.AutoField(primary_key=True)
    created_at = models.DateField(auto_now_add=True)
    updated_at = models.DateField(auto_now=True)

    class Meta:
        abstract = True

class CompanyName(BaseModel):
    company = models.CharField(max_length=200)
    rating = models.CharField(max_length=10,blank=True,null=True)
    reviews = models.CharField(max_length=10,blank=True,null=True)
    image = models.URLField(blank=True,null=True)
    details = models.TextField()

    def __str__(self):
        return self.company

class Reviews(BaseModel):
    name = models.CharField(max_length=200)
    rate = models.CharField(max_length=200)
    review = models.TextField(null=True,blank=True)
    date = models.CharField(max_length=100)
    profile_pic = models.URLField(max_length=400,blank=True,null=True)
    profile_link = models.URLField(max_length=400,blank=True,null=True)
    company = models.ForeignKey(CompanyName,on_delete=models.CASCADE,related_name='company_related')

    def __str__(self):
        return self.name