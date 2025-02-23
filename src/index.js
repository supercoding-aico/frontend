import { Provider } from 'react-redux';
import store from '@redux/store/store';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import '@styles/index.scss';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
