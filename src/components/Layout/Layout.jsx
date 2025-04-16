import React from 'react'
import Header from './../Header/Header'
import Routers from '../../router/Routers'
import Footer from './../Footer/Footer'
import { useLocation } from 'react-router-dom'

const Layout = () => {
   const location = useLocation();
   const validRoutes = ['/home', '/tours', '/about', '/login', '/register', '/thank-you', '/tours/search'];
   const isValidRoute = validRoutes.includes(location.pathname) || location.pathname.startsWith('/tours/');
   const hideHeaderFooter = location.pathname === '/admin' || !isValidRoute;

   return (
      <>
         {!hideHeaderFooter && <Header />}
         <Routers />
         {!hideHeaderFooter && <Footer />}      
      </>
   )
}

export default Layout