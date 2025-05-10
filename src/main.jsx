
import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App.jsx'
import App from './App';
// Import the base styles
import './styles.css'
import './fontAwesome';
// Import the purePajinate script
import './components/purePajinate.js'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)