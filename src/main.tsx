import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.css'
import App from './App.tsx'
import { GoogleOAuthProvider } from '@react-oauth/google'

createRoot(document.getElementById('root')!).render(
  <GoogleOAuthProvider 
  clientId='313611509177-3l20cb4msmmf7gqlue3mcj1mdfu26s26.apps.googleusercontent.com'>
  <StrictMode>
    <App />
  </StrictMode>,
  </GoogleOAuthProvider>
)
