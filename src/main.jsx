import { BrowserRouter } from 'react-router'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { AuthProvider } from './contexts/AuthContext.jsx'
import React from 'react'


createRoot(document.getElementById('root')).render(

  // <React.StrictMode>
  <BrowserRouter>
    <AuthProvider>
      <App />
    </AuthProvider>
  </BrowserRouter>
  // </React.StrictMode>
)
