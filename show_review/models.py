from django.db import models
import uuid

class BaseModel(models.Model):
    id = models.UUIDField(primary_key=True,editable=False,default=uuid.uuid4)
    created_at = models.DateField(auto_now_add=True)
    updated_at = models.DateField(auto_now=True)

    class Meta:
        abstract = True

class CompanyName(BaseModel):
    company = models.CharField(max_length=200)
    rating = models.FloatField()
    reviews = models.IntegerField()
    image = models.URLField(blank=True,null=True)

    def __str__(self):
        return self.company

class Reviews(BaseModel):
    name = models.CharField(max_length=200)
    rate = models.IntegerField()
    review = models.TextField()
    date = models.CharField(max_length=100)
    profile_pic = models.URLField(max_length=400)
    profile_link = models.URLField(max_length=400)
    company = models.ForeignKey(CompanyName,on_delete=models.CASCADE,related_name='company_related')

    def __str__(self):
        return self.name