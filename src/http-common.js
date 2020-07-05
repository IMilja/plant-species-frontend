import axios from 'axios';

const HTTP = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? 'http://localhost:3000/api' : 'http://localhost:3000/api',
});

export default HTTP;
