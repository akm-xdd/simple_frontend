// src/api.js
import axios from 'axios';

export default axios.create({
  baseURL: 'http://4.247.144.132:8000/api/items/',
  headers: { 'Content-Type': 'application/json' },
});
