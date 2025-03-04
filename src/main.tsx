import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { router } from './routes/router';

createRoot(document.getElementById('root')!).render(
  <GoogleOAuthProvider 
  clientId='313611509177-3l20cb4msmmf7gqlue3mcj1mdfu26s26.apps.googleusercontent.com'>
  <StrictMode>
  
    <RouterProvider router={router} />
     
  </StrictMode>,
  </GoogleOAuthProvider>
)
