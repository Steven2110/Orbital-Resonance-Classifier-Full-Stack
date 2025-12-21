import React, { useEffect, useState } from 'react';
import { FileText, Trash2, RefreshCw } from 'lucide-react';
import { listFiles, deleteFile } from '../services/api';
import './FileList.css';

const FileList = ({ files, onFilesUpdate }) => {
  const [allFiles, setAllFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchFiles = async () => {
    setLoading(true);
    try {
      const data = await listFiles();
      setAllFiles(data);
      onFilesUpdate(data);
    } catch (error) {
      console.error('Error fetching files:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  useEffect(() => {
    setAllFiles(files);
  }, [files]);

  const handleDelete = async (fileId) => {
    if (window.confirm('Are you sure you want to delete this file?')) {
      try {
        await deleteFile(fileId);
        const updatedFiles = allFiles.filter(f => f.id !== fileId);
        setAllFiles(updatedFiles);
        onFilesUpdate(updatedFiles);
      } catch (error) {
        console.error('Error deleting file:', error);
        alert('Failed to delete file');
      }
    }
  };

  if (loading) {
    return <div className="loading">Loading files...</div>;
  }

  return (
    <div className="file-list-container">
      <div className="file-list-header">
        <h2>📁 Uploaded Files ({allFiles.length})</h2>
        <button className="refresh-btn" onClick={fetchFiles}>
          <RefreshCw size={20} />
          Refresh
        </button>
      </div>

      {allFiles.length === 0 ? (
        <div className="empty-state">
          <FileText size={64} />
          <p>No files uploaded yet</p>
          <span>Upload some text files to get started</span>
        </div>
      ) : (
        <div className="file-grid">
          {allFiles.map((file) => (
            <div key={file.id} className="file-card">
              <div className="file-icon">
                <FileText size={32} />
              </div>
              <div className="file-info">
                <h3>{file.filename}</h3>
                <span className="file-date">
                  {new Date(file.uploaded_at).toLocaleDateString()}
                </span>
              </div>
              <button 
                className="delete-btn"
                onClick={() => handleDelete(file.id)}
                title="Delete file"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FileList;
