import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import { useState } from 'react'
import Loader from './pages/Loader'
import {Toaster} from 'react-hot-toast'

function App() {
  const [show_loading, set_show_loading] =  useState(true)
  setInterval(() => {
    set_show_loading(false)
  }, 3000);
  return (
   <>
   <Toaster />
   <BrowserRouter>
    <Routes>
      <Route path='/' element={show_loading ? <Loader /> : <Home />}></Route>
    </Routes>
   </BrowserRouter>
   </>
  )
}

export default App
