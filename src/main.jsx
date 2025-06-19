import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'; // Tailwind CSS included here
import ContextProvider from './context/AppContext.jsx';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';



ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
      <ContextProvider>
           <App />
           <Toaster />
      </ContextProvider>
  </BrowserRouter>
  
);
