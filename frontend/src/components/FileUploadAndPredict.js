import React, { useState, useRef } from 'react';
import { Upload, CheckCircle, AlertCircle, Loader, Download } from 'lucide-react';
import { uploadAndPredict, downloadResults } from '../services/api';
import ProgressModal from './ProgressModal';
import './FileUploadAndPredict.css';

const FileUploadAndPredict = ({ language = 'EN' }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [processing, setProcessing] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [message, setMessage] = useState(null);
  const [predictions, setPredictions] = useState([]);
  const [progressInfo, setProgressInfo] = useState({ current: 0, total: 0 });
  const fileInputRef = useRef(null);

  const MAX_FILES = 1000;

  // Translations
  const translations = {
    EN: {
      uploadTitle: 'Upload Text Files',
      dragDrop: 'Drag & drop text files here or click to browse (multiple files supported)',
      onlyTxt: 'Only .txt files are supported',
      selectedFiles: 'Selected Files',
      uploadPredict: 'Upload & Classify',
      uploading: 'Processing...',
      predictionResults: 'Classification Results',
      downloadResults: 'Download Results',
      preparingDownload: 'Preparing Download...',
      fileName: 'File Name',
      noResults: 'No results to download',
      downloadSuccess: 'Download started successfully!',
      downloadFailed: 'Download failed. Please try again.',
      processingFailed: 'Processing failed. Please try again.',
      onlyTxtError: 'Only .txt files are allowed',
      selectFiles: 'Please select files to upload',
      maxFilesExceeded: `Maximum ${MAX_FILES} files allowed. Only the first ${MAX_FILES} files will be uploaded.`,
      maxFilesInfo: `You can upload up to ${MAX_FILES} text files at once`,
      categories: {
        0: 'Circulation',
        1: 'Circulation/Libration',
        2: 'Libration'
      }
    },
    RU: {
      uploadTitle: 'Загрузить текстовые файлы',
      dragDrop: 'Перетащите текстовые файлы сюда или нажмите для выбора (поддержка нескольких файлов)',
      onlyTxt: 'Поддерживаются только файлы .txt',
      selectedFiles: 'Выбранные файлы',
      uploadPredict: 'Загрузить и классифицировать',
      uploading: 'Обработка...',
      predictionResults: 'Результаты классификации',
      downloadResults: 'Скачать результаты',
      preparingDownload: 'Подготовка загрузки...',
      fileName: 'Имя файла',
      noResults: 'Нет результатов для загрузки',
      downloadSuccess: 'Загрузка началась успешно!',
      downloadFailed: 'Загрузка не удалась. Пожалуйста, попробуйте снова.',
      processingFailed: 'Обработка не удалась. Пожалуйста, попробуйте снова.',
      onlyTxtError: 'Разрешены только файлы .txt',
      selectFiles: 'Пожалуйста, выберите файлы для загрузки',
      maxFilesExceeded: `Максимум ${MAX_FILES} файлов разрешено. Будут загружены только первые ${MAX_FILES} файлов.`,
      maxFilesInfo: `Вы можете загрузить до ${MAX_FILES} текстовых файлов за раз`,
      categories: {
        0: 'Циркуляция',
        1: 'Циркуляция/Либрация',
        2: 'Либрация'
      }
    }
  };

  const t = translations[language];

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    const txtFiles = files.filter(file => file.name.endsWith('.txt'));
    
    if (txtFiles.length !== files.length) {
      setMessage({ type: 'error', text: t.onlyTxtError });
    }

    // Check if exceeds max files limit
    if (txtFiles.length > MAX_FILES) {
      setMessage({ type: 'error', text: t.maxFilesExceeded });
    }
    
    // Add new files to existing ones instead of replacing
    // Limit to MAX_FILES
    const filesToAdd = txtFiles.slice(0, MAX_FILES - selectedFiles.length);
    const updatedFiles = [...selectedFiles, ...filesToAdd];
    
    // Handle duplicate filenames by adding trailing identifier
    const fileMap = new Map();
    const uniqueFiles = updatedFiles.map(file => {
      let baseName = file.name.replace('.txt', '');
      let extension = '.txt';
      let newName = file.name;
      let counter = 1;
      
      // Check if filename already exists
      while (fileMap.has(newName)) {
        newName = `${baseName}_${counter}${extension}`;
        counter++;
      }
      
      fileMap.set(newName, true);
      
      // If name changed, create a new File object with the new name
      if (newName !== file.name) {
        return new File([file], newName, { type: file.type });
      }
      
      return file;
    });
    
    setSelectedFiles(uniqueFiles);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    const txtFiles = files.filter(file => file.name.endsWith('.txt'));
    
    if (txtFiles.length !== files.length) {
      setMessage({ type: 'error', text: t.onlyTxtError });
    }

    // Check if exceeds max files limit
    if (txtFiles.length > MAX_FILES) {
      setMessage({ type: 'error', text: t.maxFilesExceeded });
    }
    
    // Add new files to existing ones instead of replacing
    // Limit to MAX_FILES
    const filesToAdd = txtFiles.slice(0, MAX_FILES - selectedFiles.length);
    const updatedFiles = [...selectedFiles, ...filesToAdd];
    
    // Handle duplicate filenames by adding trailing identifier
    const fileMap = new Map();
    const uniqueFiles = updatedFiles.map(file => {
      let baseName = file.name.replace('.txt', '');
      let extension = '.txt';
      let newName = file.name;
      let counter = 1;
      
      // Check if filename already exists
      while (fileMap.has(newName)) {
        newName = `${baseName}_${counter}${extension}`;
        counter++;
      }
      
      fileMap.set(newName, true);
      
      // If name changed, create a new File object with the new name
      if (newName !== file.name) {
        return new File([file], newName, { type: file.type });
      }
      
      return file;
    });
    
    setSelectedFiles(uniqueFiles);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleUploadAndPredict = async () => {
    if (selectedFiles.length === 0) {
      setMessage({ type: 'error', text: t.selectFiles });
      return;
    }

    setProcessing(true);
    setMessage(null);
    setProgressInfo({ current: 0, total: selectedFiles.length });

    try {
      // Simulate progress updates (since backend processes all at once)
      const progressInterval = setInterval(() => {
        setProgressInfo(prev => {
          if (prev.current < prev.total) {
            return { ...prev, current: prev.current + 1 };
          }
          return prev;
        });
      }, 500);

      // Upload and get predictions in one call
      const result = await uploadAndPredict(selectedFiles);
      
      clearInterval(progressInterval);
      setProgressInfo({ current: selectedFiles.length, total: selectedFiles.length });
      
      setPredictions(result.predictions);
      setMessage({ type: 'success', text: result.message });
      setSelectedFiles([]);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      console.error('Upload error:', error);
      console.error('Error response:', error.response);
      const errorMessage = error.response?.data?.error 
        || error.message 
        || t.processingFailed;
      setMessage({ 
        type: 'error', 
        text: errorMessage
      });
    } finally {
      setProcessing(false);
      setProgressInfo({ current: 0, total: 0 });
    }
  };

  const removeFile = (index) => {
    setSelectedFiles(selectedFiles.filter((_, i) => i !== index));
  };

  const getCategoryLabel = (value) => {
    return t.categories[value] || value;
  };

  const handleDownload = async () => {
    if (predictions.length === 0) {
      setMessage({ type: 'error', text: t.noResults });
      return;
    }

    setDownloading(true);
    try {
      await downloadResults(predictions);
      setMessage({ type: 'success', text: t.downloadSuccess });
    } catch (error) {
      console.error('Download error:', error);
      setMessage({ 
        type: 'error', 
        text: t.downloadFailed
      });
    } finally {
      setDownloading(false);
    }
  };

  return (
    <>
      <ProgressModal 
        isOpen={processing}
        currentFile={progressInfo.current}
        totalFiles={progressInfo.total}
        language={language}
      />
      <div className="upload-predict-container">
      <div className="upload-section">
        <h2>📤 {t.uploadTitle}</h2>
        
        <div 
          className="drop-zone"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onClick={() => fileInputRef.current?.click()}
        >
          <Upload size={48} />
          <p>{t.dragDrop}</p>
          <span className="file-hint">{t.onlyTxt}</span>
          <span className="file-hint file-limit-info">⚠️ {t.maxFilesInfo}</span>
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
            <h3>{t.selectedFiles} ({selectedFiles.length})</h3>
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
              className="process-btn"
              onClick={handleUploadAndPredict}
              disabled={processing}
            >
              {processing ? (
                <>
                  <Loader className="spinner" size={20} />
                  {t.uploading}
                </>
              ) : (
                t.uploadPredict
              )}
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

      {predictions.length > 0 && (
        <div className="results-section">
          <div className="results-header">
            <h2>🎯 {t.predictionResults}</h2>
            <button 
              className="download-btn"
              onClick={handleDownload}
              disabled={downloading}
            >
              {downloading ? (
                <>
                  <Loader className="spinner" size={20} />
                  {t.preparingDownload}
                </>
              ) : (
                <>
                  <Download size={20} />
                  {t.downloadResults}
                </>
              )}
            </button>
          </div>
          <div className="table-container">
            <table className="results-table">
              <thead>
                <tr>
                  <th>{t.fileName}</th>
                  <th>Ф1</th>
                  <th>Ф2</th>
                  <th>Ф3</th>
                  <th>Ф4</th>
                  <th>Ф5</th>
                </tr>
              </thead>
              <tbody>
                {predictions.map((pred, index) => (
                  <tr key={index}>
                    <td className="filename-cell">{pred.filename}</td>
                    <td>{getCategoryLabel(pred.phi1)}</td>
                    <td>{getCategoryLabel(pred.phi2)}</td>
                    <td>{getCategoryLabel(pred.phi3)}</td>
                    <td>{getCategoryLabel(pred.phi4)}</td>
                    <td>{getCategoryLabel(pred.phi5)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      </div>
    </>
  );
};

export default FileUploadAndPredict;
