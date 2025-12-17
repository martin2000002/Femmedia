import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { hiddenRoutes } from './data/navigation'

// Redirect hidden route (/presentation) before mounting React
if (typeof window !== 'undefined') {
  const match = hiddenRoutes.find((r) => r.path === window.location.pathname)
  if (match) {
    window.location.replace(match.redirect)
  } else {
    createRoot(document.getElementById('root')!).render(
      <StrictMode>
        <App />
      </StrictMode>,
    )
  }
}
