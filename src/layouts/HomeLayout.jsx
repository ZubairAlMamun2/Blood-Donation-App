import React from 'react'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import Banner from '../components/banner'
import ContactUs from '../components/ContactUs'
import FeaturedSection from '../components/FeaturedSection'
import BlogSection from '../components/BlogSection'
import Carosel from '../components/Carosel'



const HomeLayout = () => {
  return (
    <div className=''>
        <NavBar />
        <main >
          <Carosel />
          <Banner />
          <BlogSection />
          <FeaturedSection />
          <ContactUs />
        </main>
        <Footer />
    </div>
  )
}

export default HomeLayout