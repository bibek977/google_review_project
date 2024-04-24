from rest_framework import serializers
from settings_review.models import *

class PreviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Preview
        fields = "__all__"

class SettingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = SettingsPreview
        fields = "__all__"