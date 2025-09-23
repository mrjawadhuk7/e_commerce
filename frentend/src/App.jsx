import { useEffect, useState } from 'react'

import './App.css'
import Header from './Components/layout/Header'
import Footer from './Components/layout/Footer'
import Home from './Components/Home'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import NotFount from './Components/NotFount';
import {ToastContainer} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import ProductDetail from './Components/products/ProductDetail';
import {HelmetProvider} from "react-helmet-async"
import ProductSearch from './Components/products/ProductSearch'
import Login from './Components/user/Login'
import Register from './Components/user/Register'
import store from "./Components/Store"
import { loadUser } from './Components/actions/userActions'
import Profile from './Components/user/Profile'
import ProtectedRoute from './Components/route/ProtectedRoute'

function App() {
 
useEffect(()=>{
  store.dispatch(loadUser)
})
  return (
    
      <Router>
        <div className='App'>
              <HelmetProvider>

            <Header/>
            <div className='container container-fluid'>
        <ToastContainer theme='dark'/>
              <Routes>
                    <Route path='/' element={<Home/>}/>
                    <Route path='/product/:id' element={<ProductDetail/>}/>
                    <Route path='/search/:keyword' element={<ProductSearch/>}/>
                    <Route path='/login' element={<Login/>}/>
                    <Route path='/register' element={<Register/>}/>
                    <Route path='/profile' element={<ProtectedRoute><Profile/></ProtectedRoute>}/>
                    <Route path='*' element={<NotFount/>}/>
              </Routes>
            </div>
              
            <Footer/>

              </HelmetProvider>

        </div>
    </Router>
    
  )
}

export default App
