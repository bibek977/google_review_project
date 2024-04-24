from django.db import models

class Preview(models.Model):
    preview_id = models.IntegerField(default=1)


MinRatings = [
    ('1', '1'),
    ('2', '2'),
    ('3', '3'),
    ('4', '4'),
    ('5', '5'),
]

Align = [
    ('left', 'Left'),
    ('center', 'Center'),
    ('right', 'Right'),
]

Theme = [
    ('light', 'Light'),
    ('dark', 'Dark'),
]

class SettingsPreview(models.Model):
    ratingText = models.BooleanField()
    reviewDate = models.BooleanField()
    reviewName = models.BooleanField()
    rating = models.CharField(choices=MinRatings,max_length=100)
    align = models.CharField(choices=Align,max_length=100)
    theme = models.CharField(choices=Theme,max_length=100)