import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './App.css';
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { UserProvider } from './context/UserContext.tsx'
import { ToastContainer } from 'react-toastify'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
    <UserProvider>
    <App />
    <ToastContainer/>
    </UserProvider>
    </BrowserRouter>
  </StrictMode>,
)
