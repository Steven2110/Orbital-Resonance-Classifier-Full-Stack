import React, { useState } from 'react';
import './App.css';
import FileUploadAndPredict from './components/FileUploadAndPredict';
import { Globe, HelpCircle } from 'lucide-react';

function App() {
  const [language, setLanguage] = useState('EN');
  const [showHelp, setShowHelp] = useState(true); // Show on first load

  const toggleLanguage = () => {
    setLanguage(language === 'EN' ? 'RU' : 'EN');
  };

  const translations = {
    EN: {
      title: 'Orbital Resonances Classifier',
      subtitle: 'Upload files for classification',
      help: 'Help',
      helpTitle: 'How to Use Orbital Resonances Classifier',
      fileFormat: 'File Format Requirements',
      fileFormatDesc: 'Your text file must be in tab-delimited format with 6 columns:',
      column1: 'Column 1: Time (in years)',
      column2: 'Column 2: Ф1 (in degrees)',
      column3: 'Column 3: Ф2 (in degrees)',
      column4: 'Column 4: Ф3 (in degrees)',
      column5: 'Column 5: Ф4 (in degrees)',
      column6: 'Column 6: Ф5 (in degrees)',
      timeRequirement: 'Time Requirement',
      timeRequirementDesc: 'The time column must span up to 100 years of data.',
      exampleFormat: 'Example Format',
      exampleDesc: 'Your file should look like this:',
      howToUse: 'How to Use',
      step1: 'Prepare your data file in the correct tab-delimited format.',
      step2: 'Click "Upload Text Files" or drag & drop your .txt file.',
      step3: 'The system will generate scatter plots for each Ф column.',
      step4: 'Machine learning model will classify each plot as:',
      circulation: 'Circulation (Циркуляция),',
      circulationLibration: 'Circulation/Libration (Циркуляция/Либрация),',
      libration: 'Libration (Либрация).',
      step5: 'View results in the table below.',
      step6: 'Download results as ZIP file (includes images and Excel file).',
      important: 'Important Notes',
      note1: 'Only .txt files are supported.',
      note2: 'File must be tab-delimited (not comma or space).',
      note3: 'Must have exactly 6 columns.',
      note4: 'Time must go up to 100 years.',
      note5: 'All values must be numeric.',
      note6: 'Maximum 1000 files can be uploaded at once.'
    },
    RU: {
      title: 'Классификатор орбитальных резонансов',
      subtitle: 'Загрузите файлы для классификации',
      help: 'Помощь',
      helpTitle: 'Как использовать классификатор орбитального резонанса',
      fileFormat: 'Требования к формату файла',
      fileFormatDesc: 'Ваш текстовый файл должен быть в формате с разделителями табуляции и содержать 6 столбцов:',
      column1: 'Столбец 1: Время (в годах)',
      column2: 'Столбец 2: Ф1 (в град.)',
      column3: 'Столбец 3: Ф2 (в град.)',
      column4: 'Столбец 4: Ф3 (в град.)',
      column5: 'Столбец 5: Ф4 (в град.)',
      column6: 'Столбец 6: Ф5 (в град.)',
      timeRequirement: 'Требование ко времени',
      timeRequirementDesc: 'Столбец времени должен охватывать до 100 лет данных.',
      exampleFormat: 'Пример формата',
      exampleDesc: 'Ваш файл должен выглядеть так:',
      howToUse: 'Как использовать',
      step1: 'Подготовьте файл данных в правильном формате с разделителями табуляции.',
      step2: 'Нажмите "Загрузить текстовые файлы" или перетащите файл .txt.',
      step3: 'Система создаст графики изменения для каждого столбца Ф.',
      step4: 'Модель машинного обучения классифицирует каждый график как:',
      circulation: 'Циркуляция (Circulation),',
      circulationLibration: 'Циркуляция/Либрация (Circulation/Libration),',
      libration: 'Либрация (Libration).',
      step5: 'Просмотрите результаты в таблице ниже.',
      step6: 'Загрузите результаты в виде ZIP-файла (включает изображения и файл Excel).',
      important: 'Важные примечания',
      note1: 'Поддерживаются только файлы .txt.',
      note2: 'Файл должен быть разделен табуляцией (не запятыми или пробелами).',
      note3: 'Должно быть ровно 6 столбцов.',
      note4: 'Время должно доходить до 100 лет.',
      note5: 'Все значения должны быть числовыми.',
      note6: 'Максимум 1000 файлов можно загрузить за раз.'
    }
  };

  const t = translations[language];

  return (
    <div className="App">
      <header className="app-header">
        <div className="header-main">
          <div className="header-content">
            <div className="header-icon">🪐</div>
            <div className="header-text">
              <h1>{t.title}</h1>
              <p>{t.subtitle}</p>
            </div>
          </div>
          <div className="header-buttons">
            <button className="language-btn" onClick={toggleLanguage}>
              <Globe size={18} />
              <span>{language}</span>
            </button>
            <button className="help-btn" onClick={() => setShowHelp(!showHelp)}>
              <HelpCircle size={18} />
              <span>{t.help}</span>
            </button>
          </div>
        </div>
      </header>

      {showHelp && (
        <div className="help-modal-overlay" onClick={() => setShowHelp(false)}>
          <div className="help-modal" onClick={(e) => e.stopPropagation()}>
            <div className="help-modal-header">
              <h2>{t.helpTitle}</h2>
              <button className="close-btn" onClick={() => setShowHelp(false)}>✕</button>
            </div>
            <div className="help-modal-content">
              <section className="help-section">
                <h3>📋 {t.fileFormat}</h3>
                <p>{t.fileFormatDesc}</p>
                <ul className="column-list">
                  <li>{t.column1}</li>
                  <li>{t.column2}</li>
                  <li>{t.column3}</li>
                  <li>{t.column4}</li>
                  <li>{t.column5}</li>
                  <li>{t.column6}</li>
                </ul>
              </section>

              <section className="help-section">
                <h3>⏱️ {t.timeRequirement}</h3>
                <p>{t.timeRequirementDesc}</p>
              </section>

              <section className="help-section">
                <h3>📄 {t.exampleFormat}</h3>
                <p>{t.exampleDesc}</p>
                <div className="example-image">
                  <img src="/image.png" alt="File format example" />
                </div>
              </section>

              <section className="help-section">
                <h3>🚀 {t.howToUse}</h3>
                <ol className="steps-list">
                  <li>{t.step1}</li>
                  <li>{t.step2}</li>
                  <li>{t.step3}</li>
                  <li>
                    {t.step4}
                    <ul className="category-list">
                      <li><strong>0:</strong> {t.circulation}</li>
                      <li><strong>1:</strong> {t.circulationLibration}</li>
                      <li><strong>2:</strong> {t.libration}</li>
                    </ul>
                  </li>
                  <li>{t.step5}</li>
                  <li>{t.step6}</li>
                </ol>
              </section>

              <section className="help-section important-section">
                <h3>⚠️ {t.important}</h3>
                <ul className="important-list">
                  <li>{t.note1}</li>
                  <li>{t.note2}</li>
                  <li>{t.note3}</li>
                  <li>{t.note4}</li>
                  <li>{t.note5}</li>
                  <li>{t.note6}</li>
                </ul>
              </section>
            </div>
          </div>
        </div>
      )}

      <main className="app-content">
        <div className="main-content">
          <FileUploadAndPredict language={language} />
        </div>
      </main>
    </div>
  );
}

export default App;
