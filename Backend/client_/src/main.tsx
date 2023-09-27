import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render( //creates whole react stuff at root div in index.html
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
