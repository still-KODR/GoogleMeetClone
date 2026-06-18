import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  withCredentials: true,  
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config;

    if (original.url === '/auth/refresh') {
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && !original._retry) {
      original._retry = true;

      try {
        await api.post('/auth/refresh'); 
        return api(original);           
      } catch (err) {
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default api;