import React from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AdminLogin from './AdminPages/AdminLogin'
import AdminDashBoard from './AdminPages/AdminDashBoard'
import Product from './AdminPages/Products'
import Adduser from './AdminPages/Adduser'


function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path= "/" element={<AdminLogin/>}/>
          <Route path='/admindash' element={<AdminDashBoard/>}/>
          <Route path='/product' element={<Product/>}/>
          <Route path='/adduser' element={<Adduser/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App