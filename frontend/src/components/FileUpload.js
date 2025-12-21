import React, { useState, useRef } from 'react';
import { Upload, CheckCircle, AlertCircle } from 'lucide-react';
import { uploadFiles } from '../services/api';
import './FileUpload.css';

const FileUpload = ({ onFilesUploaded }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    const txtFiles = files.filter(file => file.name.endsWith('.txt'));
    
    if (txtFiles.length !== files.length) {
      setMessage({ type: 'error', text: 'Only .txt files are allowed' });
    }
    
    setSelectedFiles(txtFiles);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    const txtFiles = files.filter(file => file.name.endsWith('.txt'));
    
    if (txtFiles.length !== files.length) {
      setMessage({ type: 'error', text: 'Only .txt files are allowed' });
    }
    
    setSelectedFiles(txtFiles);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) {
      setMessage({ type: 'error', text: 'Please select files to upload' });
      return;
    }

    setUploading(true);
    setMessage(null);

    try {
      const result = await uploadFiles(selectedFiles);
      setMessage({ type: 'success', text: result.message });
      onFilesUploaded(result.files);
      setSelectedFiles([]);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      setMessage({ 
        type: 'error', 
        text: error.response?.data?.error || 'Upload failed. Please try again.' 
      });
    } finally {
      setUploading(false);
    }
  };

  const removeFile = (index) => {
    setSelectedFiles(selectedFiles.filter((_, i) => i !== index));
  };

  return (
    <div className="file-upload-container">
      <h2>📤 Upload Text Files</h2>
      
      <div 
        className="drop-zone"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={() => fileInputRef.current?.click()}
      >
        <Upload size={48} />
        <p>Drag & drop text files here or click to browse</p>
        <span className="file-hint">Only .txt files are supported</span>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept=".txt"
          onChange={handleFileSelect}
          style={{ display: 'none' }}
        />
      </div>

      {selectedFiles.length > 0 && (
        <div className="selected-files">
          <h3>Selected Files ({selectedFiles.length})</h3>
          <ul>
            {selectedFiles.map((file, index) => (
              <li key={index}>
                <span>{file.name}</span>
                <span className="file-size">
                  {(file.size / 1024).toFixed(2)} KB
                </span>
                <button 
                  className="remove-btn"
                  onClick={() => removeFile(index)}
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
          <button 
            className="upload-btn"
            onClick={handleUpload}
            disabled={uploading}
          >
            {uploading ? 'Uploading...' : 'Upload Files'}
          </button>
        </div>
      )}

      {message && (
        <div className={`message ${message.type}`}>
          {message.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
          <span>{message.text}</span>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
