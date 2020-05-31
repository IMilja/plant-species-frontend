import axios from 'axios';

const HTTP = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? '/api' : 'http://localhost:3000/api',
});

export default HTTP;
