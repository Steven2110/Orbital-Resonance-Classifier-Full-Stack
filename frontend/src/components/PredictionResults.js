import React, { useEffect, useState } from 'react';
import { Brain, RefreshCw, TrendingUp } from 'lucide-react';
import { listPredictions } from '../services/api';
import './PredictionResults.css';

const PredictionResults = ({ predictions }) => {
  const [allPredictions, setAllPredictions] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchPredictions = async () => {
    setLoading(true);
    try {
      const data = await listPredictions();
      setAllPredictions(data);
    } catch (error) {
      console.error('Error fetching predictions:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPredictions();
  }, []);

  useEffect(() => {
    setAllPredictions(predictions);
  }, [predictions]);

  if (loading) {
    return <div className="loading">Loading predictions...</div>;
  }

  return (
    <div className="prediction-results-container">
      <div className="prediction-header">
        <h2>🤖 ML Predictions ({allPredictions.length})</h2>
        <button className="refresh-btn" onClick={fetchPredictions}>
          <RefreshCw size={20} />
          Refresh
        </button>
      </div>

      {allPredictions.length === 0 ? (
        <div className="empty-state">
          <Brain size={64} />
          <p>No predictions yet</p>
          <span>Run predictions on your generated images</span>
        </div>
      ) : (
        <div className="prediction-list">
          {allPredictions.map((prediction) => (
            <div key={prediction.id} className="prediction-card">
              <div className="prediction-header-info">
                <div className="prediction-icon">
                  <Brain size={32} />
                </div>
                <div className="prediction-meta">
                  <h3>Prediction #{prediction.id}</h3>
                  <span className="prediction-date">
                    {new Date(prediction.created_at).toLocaleString()}
                  </span>
                </div>
                {prediction.confidence !== null && (
                  <div className="confidence-badge">
                    <TrendingUp size={16} />
                    <span>{(prediction.confidence * 100).toFixed(1)}%</span>
                  </div>
                )}
              </div>

              {prediction.image && (
                <div className="related-image">
                  <strong>Related Image:</strong>
                  <span>Image #{prediction.image.id}</span>
                </div>
              )}

              <div className="prediction-result">
                <strong>Prediction Result:</strong>
                <pre>{JSON.stringify(prediction.prediction_result, null, 2)}</pre>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PredictionResults;
