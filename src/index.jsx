import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import reportWebVitals from './reportWebVitals'
import { BrowserRouter } from "react-router-dom"
import App from './App'

axios.defaults.baseURL = "https://emir-user-management-api.herokuapp.com"

ReactDOM.render(
  <BrowserRouter>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
