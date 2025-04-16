import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import ThankYou from '../pages/ThankYou'
import Home from './../pages/Home'
import Login from './../pages/Login'
import Register from './../pages/Register'
import SearchResultList from './../pages/SearchResultList'
import TourDetails from './../pages/TourDetails'
import Tours from './../pages/Tours'
import About from './../pages/About'
import AdminDashboard from '../AdminDashboard/AdminDashboard'
import NotFound from '../pages/NotFound'
import AdminLogin from '../AdminDashboard/components/AdminLogin'
import ProtectedRoute from '../components/ProtectedRoute'

const Routers = () => {
   return (
      <Routes>
         <Route path='/' element={<Navigate to='/home'/>} />
         <Route path='/home' element={<Home/>} />
         <Route path='/tours' element={<Tours/>} />
         <Route path='/tours/:id' element={<TourDetails/>} />
         <Route path='/login' element={<Login/>} />
         <Route path='/register' element={<Register/>} />
         <Route path='/about' element={<About/>} />
         <Route path='/thank-you' element={<ThankYou/>} />
         <Route path='/tours/search' element={<SearchResultList/>} />
         <Route path='/admin/login' element={<AdminLogin/>} />
         <Route 
            path='/admin/dashboard' 
            element={
               <ProtectedRoute>
                  <AdminDashboard/>
               </ProtectedRoute>
            } 
         />
         <Route path='/admin' element={<Navigate to="/admin/login" />} />
         {/* 404 route - must be last */}
         <Route path='*' element={<NotFound/>} />
      </Routes>
   )
}

export default Routers