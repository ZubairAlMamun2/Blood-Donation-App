import React from 'react'
import { Outlet } from 'react-router-dom'

import Footer from '../components/Footer'
import NavBar from '../components/NavBar'


const AuthLayouts = () => {
  return (
    <div className='w-11/12 mx-auto'>
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