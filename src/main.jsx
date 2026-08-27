import { createRoot } from 'react-dom/client'
import './index.css'
import './styles/main.scss'
import './styles/responsive.scss'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
)
