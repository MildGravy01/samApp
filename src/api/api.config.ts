import axios from 'axios';

export const instance = axios.create({
  baseURL: 'http://188.120.225.49:3001',
  timeout: 100000,
});
