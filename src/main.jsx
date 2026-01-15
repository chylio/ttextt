import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'   // ← 這一行就是你問的

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
