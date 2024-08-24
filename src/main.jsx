import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import Context from '../context/Context.jsx'
import MessengerCustomerChat from 'react-messenger-customer-chat';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Context>
        <App />
        <MessengerCustomerChat
                pageId="100179096045189"
                appId="398863669833876"
            />
      </Context>
    </BrowserRouter>
  </React.StrictMode>,
)
