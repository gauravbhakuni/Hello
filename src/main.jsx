import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Loader from './components/Loader.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Loader />
  </StrictMode>,
)
