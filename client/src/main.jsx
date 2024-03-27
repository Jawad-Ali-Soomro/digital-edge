import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { Provider } from 'react-redux'
import './index.css'
import { configureStore } from '@reduxjs/toolkit'
import { user_reducer } from './redux-reducers/user.js'

const store = configureStore({
  reducer : {
    user : user_reducer
  }
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)
