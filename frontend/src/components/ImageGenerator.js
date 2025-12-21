import React, { useState } from 'react';
import { Image, CheckSquare, Square } from 'lucide-react';
import { generateImage } from '../services/api';
import './ImageGenerator.css';

const ImageGenerator = ({ files, onImageGenerated }) => {
  const [selectedFileIds, setSelectedFileIds] = useState([]);
  const [generating, setGenerating] = useState(false);
  const [message, setMessage] = useState(null);

  const toggleFileSelection = (fileId) => {
    if (selectedFileIds.includes(fileId)) {
      setSelectedFileIds(selectedFileIds.filter(id => id !== fileId));
    } else {
      setSelectedFileIds([...selectedFileIds, fileId]);
    }
  };

  const selectAll = () => {
    if (selectedFileIds.length === files.length) {
      setSelectedFileIds([]);
    } else {
      setSelectedFileIds(files.map(f => f.id));
    }
  };

  const handleGenerate = async () => {
    if (selectedFileIds.length === 0) {
      setMessage({ type: 'error', text: 'Please select at least one file' });
      return;
    }

    setGenerating(true);
    setMessage(null);

    try {
      const result = await generateImage(selectedFileIds);
      setMessage({ type: 'success', text: result.message });
      onImageGenerated(result.image);
      setSelectedFileIds([]);
    } catch (error) {
      setMessage({ 
        type: 'error', 
        text: error.response?.data?.error || 'Image generation failed' 
      });
    } finally {
      setGenerating(false);
    }
  };

  if (files.length === 0) {
    return (
      <div className="image-generator-container">
        <div className="empty-state">
          <Image size={64} />
          <p>No files available</p>
          <span>Please upload some text files first</span>
        </div>
      </div>
    );
  }

  return (
    <div className="image-generator-container">
      <h2>🎨 Generate Image from Text Files</h2>
      <p className="subtitle">Select files to generate visualization</p>

      <div className="selection-controls">
        <button className="select-all-btn" onClick={selectAll}>
          {selectedFileIds.length === files.length ? 'Deselect All' : 'Select All'}
        </button>
        <span className="selection-count">
          {selectedFileIds.length} of {files.length} selected
        </span>
      </div>

      <div className="file-selection-list">
        {files.map((file) => (
          <div 
            key={file.id} 
            className={`selectable-file ${selectedFileIds.includes(file.id) ? 'selected' : ''}`}
            onClick={() => toggleFileSelection(file.id)}
          >
            <div className="checkbox">
              {selectedFileIds.includes(file.id) ? (
                <CheckSquare size={24} />
              ) : (
                <Square size={24} />
              )}
            </div>
            <div className="file-details">
              <h4>{file.filename}</h4>
              <span>{new Date(file.uploaded_at).toLocaleDateString()}</span>
            </div>
          </div>
        ))}
      </div>

      <button 
        className="generate-btn"
        onClick={handleGenerate}
        disabled={generating || selectedFileIds.length === 0}
      >
        {generating ? 'Generating...' : 'Generate Image'}
      </button>

      {message && (
        <div className={`message ${message.type}`}>
          <span>{message.text}</span>
        </div>
      )}
    </div>
  );
};

export default ImageGenerator;
