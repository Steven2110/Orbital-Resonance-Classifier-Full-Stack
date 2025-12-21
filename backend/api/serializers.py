from rest_framework import serializers
from .models import TextFile, GeneratedImage, Prediction


class TextFileSerializer(serializers.ModelSerializer):
    class Meta:
        model = TextFile
        fields = ['id', 'file', 'filename', 'uploaded_at']
        read_only_fields = ['id', 'uploaded_at']


class GeneratedImageSerializer(serializers.ModelSerializer):
    text_files = TextFileSerializer(many=True, read_only=True)
    
    class Meta:
        model = GeneratedImage
        fields = ['id', 'image', 'text_files', 'created_at']
        read_only_fields = ['id', 'created_at']


class PredictionSerializer(serializers.ModelSerializer):
    image = GeneratedImageSerializer(read_only=True)
    
    class Meta:
        model = Prediction
        fields = ['id', 'image', 'prediction_result', 'confidence', 'created_at']
        read_only_fields = ['id', 'created_at']
