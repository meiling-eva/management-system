import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { Provider } from 'react-redux';
import store from './store'
import './api/mock'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    //strick mode lets you find common bugs in your components early during development
    <React.StrictMode>
        <Provider store={store }>
            <App />
        </Provider>
  </React.StrictMode>
);

reportWebVitals();
