import React from 'react';
import { Loader } from 'lucide-react';
import './ProgressModal.css';

const ProgressModal = ({ isOpen, currentFile, totalFiles, language = 'EN' }) => {
  if (!isOpen) return null;

  const translations = {
    EN: {
      processing: 'Processing Files',
      pleaseWait: 'Please wait while we process your files...',
      analyzing: 'Analyzing',
      of: 'of',
      doNotClose: 'Please do not close this window'
    },
    RU: {
      processing: 'Обработка файлов',
      pleaseWait: 'Пожалуйста, подождите, пока мы обрабатываем ваши файлы...',
      analyzing: 'Анализ',
      of: 'из',
      doNotClose: 'Пожалуйста, не закрывайте это окно'
    }
  };

  const t = translations[language];
  const progress = totalFiles > 0 ? (currentFile / totalFiles) * 100 : 0;

  return (
    <div className="progress-modal-overlay">
      <div className="progress-modal">
        <div className="progress-modal-content">
          <div className="progress-icon">
            <Loader className="spinner-large" size={64} />
          </div>
          <h2>{t.processing}</h2>
          <p className="progress-subtitle">{t.pleaseWait}</p>
          
          <div className="progress-info">
            <span className="progress-text">
              {t.analyzing} {currentFile} {t.of} {totalFiles}
            </span>
          </div>
          
          <div className="progress-bar-container">
            <div 
              className="progress-bar-fill" 
              style={{ width: `${progress}%` }}
            >
              <span className="progress-percentage">{Math.round(progress)}%</span>
            </div>
          </div>
          
          <p className="progress-warning">{t.doNotClose}</p>
        </div>
      </div>
    </div>
  );
};

export default ProgressModal;
