"""
ML Model Predictor
Loads the trained Keras model and makes predictions on generated images
"""
import os
import numpy as np
from django.conf import settings
from PIL import Image

# Global model variable (loaded once)
MODEL = None
MODEL_PATH = os.path.join(settings.BASE_DIR, 'models', 'best_model_all.keras')


def clear_model():
    """Clear the cached model to force reload"""
    global MODEL
    MODEL = None
    print("Model cache cleared")


def load_model():
    """
    Load the Keras model (only once)
    Returns the loaded model
    """
    global MODEL
    
    if MODEL is None:
        try:
            import tensorflow as tf
            print(f"Loading model from: {MODEL_PATH}")
            
            # Check if file exists
            if not os.path.exists(MODEL_PATH):
                raise FileNotFoundError(f"Model file not found at: {MODEL_PATH}")
            
            MODEL = tf.keras.models.load_model(MODEL_PATH)
            print("Model loaded successfully!")
            print(f"Model inputs: {MODEL.input_names if hasattr(MODEL, 'input_names') else 'N/A'}")
        except Exception as e:
            print(f"Error loading model: {e}")
            raise
    
    return MODEL


def predict_from_images(text_file_path):
    """
    Generate images from text file and run ML predictions
    
    Args:
        text_file_path: Path to the uploaded text file
        
    Returns:
        dict: Predictions for each Φ
        Example: {'phi1': 0, 'phi2': 1, 'phi3': 2, 'phi4': 0, 'phi5': 1}
        
    Prediction values:
        0 = Circulation
        1 = Circulation/Libration
        2 = Libration
    """
    from .views import generate_scatter_plot_image
    
    # Load model
    model = load_model()
    
    predictions = {}
    
    try:
        # Generate all 5 images (Φ1 to Φ5)
        img_f1 = generate_scatter_plot_image(text_file_path, 1)
        img_f2 = generate_scatter_plot_image(text_file_path, 2)
        img_f3 = generate_scatter_plot_image(text_file_path, 3)
        img_f4 = generate_scatter_plot_image(text_file_path, 4)
        img_f5 = generate_scatter_plot_image(text_file_path, 5)
        
        # Convert to arrays and normalize
        img_f1 = np.expand_dims(np.array(img_f1).astype('float32') / 255.0, axis=0)
        img_f2 = np.expand_dims(np.array(img_f2).astype('float32') / 255.0, axis=0)
        img_f3 = np.expand_dims(np.array(img_f3).astype('float32') / 255.0, axis=0)
        img_f4 = np.expand_dims(np.array(img_f4).astype('float32') / 255.0, axis=0)
        img_f5 = np.expand_dims(np.array(img_f5).astype('float32') / 255.0, axis=0)
        
        # Predict with all 5 images as separate inputs
        preds = model.predict({
            'input_f1': img_f1,
            'input_f2': img_f2,
            'input_f3': img_f3,
            'input_f4': img_f4,
            'input_f5': img_f5
        }, verbose=0)
        
        # Extract predictions for each Φ
        predictions['phi1'] = int(np.argmax(preds[0], axis=1)[0])
        predictions['phi2'] = int(np.argmax(preds[1], axis=1)[0])
        predictions['phi3'] = int(np.argmax(preds[2], axis=1)[0])
        predictions['phi4'] = int(np.argmax(preds[3], axis=1)[0])
        predictions['phi5'] = int(np.argmax(preds[4], axis=1)[0])
        
        print(f"Φ1 prediction: {predictions['phi1']}")
        print(f"Φ2 prediction: {predictions['phi2']}")
        print(f"Φ3 prediction: {predictions['phi3']}")
        print(f"Φ4 prediction: {predictions['phi4']}")
        print(f"Φ5 prediction: {predictions['phi5']}")
        
    except Exception as e:
        print(f"Error in prediction: {e}")
        import traceback
        traceback.print_exc()
        # Default to 0 (Circulation) on error
        for phi_index in range(1, 6):
            predictions[f'phi{phi_index}'] = 0
    
    return predictions
