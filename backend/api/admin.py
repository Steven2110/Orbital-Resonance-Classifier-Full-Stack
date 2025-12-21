from django.contrib import admin
from .models import TextFile, GeneratedImage, Prediction


@admin.register(TextFile)
class TextFileAdmin(admin.ModelAdmin):
    list_display = ['id', 'filename', 'uploaded_at']
    list_filter = ['uploaded_at']
    search_fields = ['filename']


@admin.register(GeneratedImage)
class GeneratedImageAdmin(admin.ModelAdmin):
    list_display = ['id', 'created_at']
    list_filter = ['created_at']


@admin.register(Prediction)
class PredictionAdmin(admin.ModelAdmin):
    list_display = ['id', 'image', 'confidence', 'created_at']
    list_filter = ['created_at']
