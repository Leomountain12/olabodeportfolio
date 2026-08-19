// src/api/client.js

// ✅ No fallback to localhost – this will now fail if VITE_API_URL is not set
const API_URL = import.meta.env.VITE_API_URL;

const apiCall = async (endpoint, options = {}) => {
  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });
  if (!response.ok) {
    // Try to parse error as JSON; fallback to text if it's not JSON
    let errorMessage;
    try {
      const errorJson = await response.json();
      errorMessage = errorJson.error || 'API request failed';
    } catch (_) {
      errorMessage = await response.text() || 'API request failed';
    }
    throw new Error(errorMessage);
  }
  return response.json();
};

export const projectsApi = {
  getAll: () => apiCall('/projects'),
  getOne: (id) => apiCall(`/projects/${id}`),
  create: (data) => apiCall('/projects', { method: 'POST', body: JSON.stringify(data) }),
  update: (id, data) => apiCall(`/projects/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id) => apiCall(`/projects/${id}`, { method: 'DELETE' }),
  uploadImage: (image, projectTitle) => apiCall('/projects/upload-image', {
    method: 'POST',
    body: JSON.stringify({ image, projectTitle }),
  }),
};

export const profileApi = {
  get: () => apiCall('/profile'),
  update: (data) => apiCall('/profile', { method: 'PUT', body: JSON.stringify(data) }),
  uploadImage: (image) => apiCall('/profile/upload-image', {
    method: 'POST',
    body: JSON.stringify({ image }),
  }),
};

export const messagesApi = {
  getAll: () => apiCall('/messages'),
  create: (data) => apiCall('/messages', { method: 'POST', body: JSON.stringify(data) }),
  update: (id, data) => apiCall(`/messages/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id) => apiCall(`/messages/${id}`, { method: 'DELETE' }),
};