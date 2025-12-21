import React, { useEffect, useState } from 'react';
import { Image as ImageIcon, Brain, RefreshCw } from 'lucide-react';
import { listImages, predictFromImage } from '../services/api';
import './ImageList.css';

const ImageList = ({ images, onImagesUpdate, onPredictionComplete }) => {
  const [allImages, setAllImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [predicting, setPredicting] = useState(null);

  const fetchImages = async () => {
    setLoading(true);
    try {
      const data = await listImages();
      setAllImages(data);
      onImagesUpdate(data);
    } catch (error) {
      console.error('Error fetching images:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  useEffect(() => {
    setAllImages(images);
  }, [images]);

  const handlePredict = async (imageId) => {
    setPredicting(imageId);
    try {
      const result = await predictFromImage(imageId);
      onPredictionComplete(result.prediction);
      alert('Prediction completed! Check the Predictions tab.');
    } catch (error) {
      console.error('Error predicting:', error);
      alert('Prediction failed: ' + (error.response?.data?.error || 'Unknown error'));
    } finally {
      setPredicting(null);
    }
  };

  if (loading) {
    return <div className="loading">Loading images...</div>;
  }

  return (
    <div className="image-list-container">
      <div className="image-list-header">
        <h2>🖼️ Generated Images ({allImages.length})</h2>
        <button className="refresh-btn" onClick={fetchImages}>
          <RefreshCw size={20} />
          Refresh
        </button>
      </div>

      {allImages.length === 0 ? (
        <div className="empty-state">
          <ImageIcon size={64} />
          <p>No images generated yet</p>
          <span>Generate images from your text files</span>
        </div>
      ) : (
        <div className="image-grid">
          {allImages.map((image) => (
            <div key={image.id} className="image-card">
              <div className="image-preview">
                {image.image ? (
                  <img 
                    src={`http://localhost:8000${image.image}`} 
                    alt={`Generated ${image.id}`}
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                ) : null}
                <div className="placeholder-icon" style={{ display: image.image ? 'none' : 'flex' }}>
                  <ImageIcon size={48} />
                  <span>Image placeholder</span>
                </div>
              </div>
              <div className="image-info">
                <h3>Image #{image.id}</h3>
                <span className="image-date">
                  {new Date(image.created_at).toLocaleDateString()}
                </span>
                <div className="source-files">
                  <strong>Source files:</strong>
                  <ul>
                    {image.text_files && image.text_files.map((file) => (
                      <li key={file.id}>{file.filename}</li>
                    ))}
                  </ul>
                </div>
                <button 
                  className="predict-btn"
                  onClick={() => handlePredict(image.id)}
                  disabled={predicting === image.id}
                >
                  <Brain size={18} />
                  {predicting === image.id ? 'Predicting...' : 'Run Prediction'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageList;
