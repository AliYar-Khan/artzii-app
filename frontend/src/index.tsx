import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { GoogleOAuthProvider } from '@react-oauth/google'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider
      clientId="316208950929-t4tnfl1n3a4afiddtt80n9044rfdg70f.apps.googleusercontent.com"
    >
      <App />
    </GoogleOAuthProvider>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
