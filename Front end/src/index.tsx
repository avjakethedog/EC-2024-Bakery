import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './Container/App';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Đây bao gồm cả Popper.js

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <App />
);

