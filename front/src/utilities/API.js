import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000',
  timeout: 1000,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
});

<<<<<<< HEAD
  
=======
export default axiosInstance;
>>>>>>> 422e30022f83921cc1cec33a22cd7aeef868406f
