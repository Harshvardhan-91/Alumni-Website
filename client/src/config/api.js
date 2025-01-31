const API_BASE_URL = import.meta.env.PROD 
  ? 'https://alumni-website-backend2.onrender.com' // Your deployed backend URL
  : 'http://localhost:5000';

export default API_BASE_URL; 