import React from 'react'
import { useParams } from 'react-router-dom'

const DonationRequstDetails = () => {
    const data=useParams()
    console.log(data)
  return (
    <div>DonationRequstDetails</div>
  )
}

export default DonationRequstDetails