import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://192.168.27.3:8000',
  timeout: 1000,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
});

export default axiosInstance;
