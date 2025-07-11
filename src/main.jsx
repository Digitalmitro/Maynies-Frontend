import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { AuthProvider } from './context/authContext'

createRoot(document.getElementById('root')).render(
  <AuthProvider>
  <StrictMode>
    <App />
  </StrictMode>
  </AuthProvider>
)
