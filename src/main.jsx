import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import router from './routes/index.jsx';
import axios from 'axios';
import { Provider } from 'react-redux';
import { store } from './store/store.jsx';

/** Setup axios */
axios.defaults.baseURL = "https://api.themoviedb.org/3";
axios.defaults.headers.common['Authorization'] = `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MzhkOTYwMTM1ODFiMDg0ZTBhZmMwZWJmM2RkNjY1ZSIsIm5iZiI6MTcyMTU4MzE0My43MTM0NTIsInN1YiI6IjY2OWNlYWM0ZjZiOTM4NmMxNzA5YmJjZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.5mF-WUuRIHmim_hyk5wRytU-t5pVsAUMapcJ9cH0B5c`;


ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
  // </React.StrictMode>
);
