import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Combined upload and predict endpoint
export const uploadAndPredict = async (files) => {
  const formData = new FormData();
  files.forEach(file => {
    formData.append('files', file);
  });
  
  const response = await api.post('/upload-and-predict/', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

// Download results as zip file
export const downloadResults = async (predictions) => {
  const response = await api.post('/download-results/', 
    { predictions },
    { 
      responseType: 'blob',
      headers: {
        'Content-Type': 'application/json',
      }
    }
  );
  
  // Create a download link
  const url = window.URL.createObjectURL(new Blob([response.data]));
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', 'prediction_results.zip');
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(url);
};

// File upload endpoints
export const uploadFiles = async (files) => {
  const formData = new FormData();
  files.forEach(file => {
    formData.append('files', file);
  });
  
  const response = await api.post('/upload/', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const listFiles = async () => {
  const response = await api.get('/files/');
  return response.data;
};

export const deleteFile = async (fileId) => {
  const response = await api.delete(`/files/${fileId}/`);
  return response.data;
};

// Image generation endpoints
export const generateImage = async (fileIds) => {
  const response = await api.post('/generate-image/', { file_ids: fileIds });
  return response.data;
};

export const listImages = async () => {
  const response = await api.get('/images/');
  return response.data;
};

// Prediction endpoints
export const predictFromImage = async (imageId) => {
  const response = await api.post(`/images/${imageId}/predict/`);
  return response.data;
};

export const listPredictions = async () => {
  const response = await api.get('/predictions/');
  return response.data;
};

export const getPrediction = async (predictionId) => {
  const response = await api.get(`/predictions/${predictionId}/`);
  return response.data;
};

export default api;
