import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'

// Kyunki aap abhi React Router use nahi kar rahe hain, 
// isliye yahan BrowserRouter ki zaroorat nahi hai.
ReactDOM.createRoot(document.getElementById('root')).render(
 <BrowserRouter>

    <App />
     </BrowserRouter>
 
)

