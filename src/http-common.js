/* eslint-disable no-param-reassign */
import axios from 'axios';

const HTTP = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? '/api' : 'http://localhost:3000/api',
});

HTTP.interceptors.request.use(
  (config) => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;

    if (currentUser) {
      config.headers.Authorization = `Bearer ${currentUser.accessToken}`;
    }

    return config;
  },

  (error) => Promise.reject(error),
);

export default HTTP;
