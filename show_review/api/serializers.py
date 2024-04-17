from rest_framework import serializers
from show_review.models import *

class CompanyNameSerializer(serializers.ModelSerializer):
    class Meta:
        model = CompanyName
        fields = "__all__"

class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reviews
        fields = "__all__"

class SearchDataSerializer(serializers.Serializer):
    title = models.CharField(max_length=200)
