// src/api.js
import axios from 'axios';

export default axios.create({
  baseURL: 'http://localhost:8000/api/items/',
  headers: { 'Content-Type': 'application/json' },
});
