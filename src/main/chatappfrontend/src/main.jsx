import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './component/App.jsx'
import {BrowserRouter} from 'react-router-dom'
import './css/index.scss'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <BrowserRouter>
          <App />
      </BrowserRouter>
  </React.StrictMode>,
)
