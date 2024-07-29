import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from 'components/App';
import { BrowserRouter } from 'react-router-dom';
import './css/index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter basename="/react-movies">
      <App />
    </BrowserRouter>
);
