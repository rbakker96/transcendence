import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import axios from "axios";
import './index.css'

axios.defaults.baseURL = 'http://localhost:8000/api/';
axios.defaults.withCredentials = true;

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
