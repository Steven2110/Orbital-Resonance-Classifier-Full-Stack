from django.db import models
from django.utils import timezone


class TextFile(models.Model):
    """Model to store uploaded text files"""
    file = models.FileField(upload_to='uploads/')
    filename = models.CharField(max_length=255)
    uploaded_at = models.DateTimeField(default=timezone.now)
    
    def __str__(self):
        return self.filename


class GeneratedImage(models.Model):
    """Model to store generated images"""
    image = models.ImageField(upload_to='generated_images/')
    text_files = models.ManyToManyField(TextFile, related_name='generated_images')
    created_at = models.DateTimeField(default=timezone.now)
    
    def __str__(self):
        return f"Image {self.id} - {self.created_at}"


class Prediction(models.Model):
    """Model to store ML predictions"""
    image = models.ForeignKey(GeneratedImage, on_delete=models.CASCADE, related_name='predictions')
    prediction_result = models.JSONField()
    confidence = models.FloatField(null=True, blank=True)
    created_at = models.DateTimeField(default=timezone.now)
    
    def __str__(self):
        return f"Prediction {self.id} for Image {self.image.id}"
