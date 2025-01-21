import React from 'react'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'


const HomeLayout = () => {
  return (
    <div className='w-11/12 mx-auto'>
        <NavBar />
        <main className='min-h-[60vh]'>
          {/* <ThemeToggle />
        <Banner />
        <AssignmentTab />
        <PendingTab/>
        <AddnewAssignmentTab />
        <Faqsection/> */}
        </main>
        <Footer />
    </div>
  )
}

export default HomeLayout