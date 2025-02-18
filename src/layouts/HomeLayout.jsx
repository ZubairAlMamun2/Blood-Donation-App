import React from 'react'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import Banner from '../components/banner'
import ContactUs from '../components/ContactUs'
import FeaturedSection from '../components/FeaturedSection'



const HomeLayout = () => {
  return (
    <div className=''>
        <NavBar />
        <main className='min-h-[60vh]'>
          <Banner />
          <FeaturedSection />
        <ContactUs />
        </main>
        <Footer />
    </div>
  )
}

export default HomeLayout