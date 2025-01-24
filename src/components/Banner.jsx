import React from 'react'
import { Link } from 'react-router-dom'

const Banner = () => {
  return (
    <div
  className="hero min-h-[60vh]"
  style={{
    backgroundImage: "url(https://i.ibb.co.com/Qb1wfg4/images.jpg)",
  }}>
    
  <div className="hero-overlay md:flex gap-5 justify-center bg-opacity-60">
  <div className="hero-content card shadow-2xl">
    <div className="max-w-md ">
      <h1 className="mb-5 text-5xl text-white font-bold">Join as a donor</h1>
      
      <Link className="px-5 py-2 text-white bg-red-600 border-none rounded-lg" to="/auth/register">Join</Link>
    </div>
  </div>
  <div className="hero-content card shadow-2xl">
    <div className="max-w-md">
      <h1 className="mb-5 text-5xl text-white font-bold">Search Donors</h1>
     
      <Link to="/searchdonor" className="px-5 py-2 text-white bg-red-600 border-none rounded-lg">Search</Link>
    </div>
  </div>
  </div>
</div>
  )
}

export default Banner