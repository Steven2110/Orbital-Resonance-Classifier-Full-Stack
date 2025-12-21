from django.urls import path
from . import views

urlpatterns = [
    # Combined upload and predict endpoint (simplified workflow)
    path('upload-and-predict/', views.upload_and_predict, name='upload_and_predict'),
    
    # Download results as zip
    path('download-results/', views.download_results, name='download_results'),
    
    # File upload endpoints
    path('upload/', views.upload_files, name='upload_files'),
    path('files/', views.list_files, name='list_files'),
    path('files/<int:file_id>/', views.delete_file, name='delete_file'),
    
    # Image generation endpoints
    path('generate-image/', views.generate_image, name='generate_image'),
    path('images/', views.list_images, name='list_images'),
    
    # Prediction endpoints
    path('images/<int:image_id>/predict/', views.predict_from_image, name='predict_from_image'),
    path('predictions/', views.list_predictions, name='list_predictions'),
    path('predictions/<int:prediction_id>/', views.get_prediction, name='get_prediction'),
]
