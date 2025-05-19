import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RouterProvider } from 'react-router-dom'
import { router } from './Router.jsx'
import { AuthContext } from './Provider/AuthContext.jsx'
import AuthProvider from './Provider/AuthProvider.jsx'

createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>
  </AuthProvider>
)
