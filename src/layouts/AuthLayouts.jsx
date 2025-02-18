import React from 'react'
import { Outlet } from 'react-router-dom'

import Footer from '../components/Footer'
import NavBar from '../components/NavBar'


const AuthLayouts = () => {
  return (
    <div className=''>
        <header>
            <NavBar />
        </header>
        <main>
            <Outlet />
        </main>
        <Footer />
    </div>
  )
}

export default AuthLayouts