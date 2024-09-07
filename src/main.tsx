import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { AlertDialogProvider } from './components/ui/alert-dialog-provider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AlertDialogProvider>
      <App />
    </AlertDialogProvider>
  </StrictMode>,
)
