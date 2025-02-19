import React from 'react'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import Banner from '../components/banner'
import ContactUs from '../components/ContactUs'
import FeaturedSection from '../components/FeaturedSection'
import BlogSection from '../components/BlogSection'
import Carosel from '../components/Carosel'
import ThemeToggle from '../components/ThemeTogole'
import HowItWorks from '../components/WorksSection'
import FAQSection from '../components/FaqSection'



const HomeLayout = () => {
  return (
    <div className=''>
        <NavBar />
        <main >
          <ThemeToggle />
          <Carosel />
          <Banner />
          <BlogSection />
          <HowItWorks />
          <FeaturedSection />
          <ContactUs />
          <FAQSection />
        </main>
        <Footer />
    </div>
  )
}

export default HomeLayout