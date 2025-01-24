import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../provider/AuthProvider'
import axios from 'axios'
import { Link, useLoaderData } from 'react-router-dom'
import Swal from 'sweetalert2'
import NavBar from './NavBar'
import Footer from './Footer'
const PendingDonationRequest = () => {
  const {user}=useContext(AuthContext)
     const [donation,setDoation]=useState([]);
     const data=useLoaderData();
     // 
     useEffect(()=>{
         const filtred=data.filter(item=>item.donationStatus=="pending")
        setDoation(filtred)
     },[data,user])
 
 
 
     console.log(donation);
     
   return (
     <div className='w-11/12 mx-auto'> 
     <NavBar />
         <table className="table">
     {/* head */}
     <thead>
       <tr className='border'>
         
         <th>Recipient Name</th>
         <th>Recipient location</th>
         <th>Blood group</th>
         <th>Donation date</th>
         <th>Donation time</th>
       </tr>
     </thead>
     <tbody>
       {/* row 1 */}
       {
         donation.map((item)=>{
             return <tr key={item._id} className='border'>
             <td>{item.recipientName}</td>
             <td>{item.selecteddistrict},{item.selectedupazila}</td>
             <td>{item.bloodGroup}</td>
             <td>{item.date}</td>
             <td>{item.time}</td>
             <td><Link className='btn' to={`/dashboard/details-donation-request/${item._id}`} >View</Link></td>
             
           </tr>
         })
       }
       
     </tbody>
   </table>
   <Footer /></div>

   )
}

export default PendingDonationRequest