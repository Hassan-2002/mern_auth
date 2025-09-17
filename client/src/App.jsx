import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import EmailVerify from './pages/EmailVerify'
import ResetPassword from './pages/ResetPassword'
import { ToastContainer } from 'react-toastify'

function App() {
  return (
   
      <div className='min-h-screen'>
         <ToastContainer />
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/email-verify' element={<EmailVerify/>}></Route>
          <Route path='/reset-password' element={<ResetPassword/>}></Route>

        </Routes>
      
      </div>
    
  )
}

export default App
