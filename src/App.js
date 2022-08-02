import React from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AdminLogin from './AdminPages/AdminLogin'
import AdminDashBoard from './AdminPages/AdminDashBoard'


function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path= "/" element={<AdminLogin/>}/>
          <Route path='/admindash' element={<AdminDashBoard/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App