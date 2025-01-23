import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../provider/AuthProvider'
import axios from 'axios'
import { Link, useLoaderData } from 'react-router-dom'
import Swal from 'sweetalert2'

const MyDonationREquest = () => {
    const {user}=useContext(AuthContext)
    const [donation,setDoation]=useState([]);
    const data=useLoaderData();
    // 
    useEffect(()=>{
        const filtreddata=data.filter(item=>item.requesterEmail==user?.email)
          setDoation(filtreddata)
    },[data,user])


    
    const handleDelete = (_id) => {
        // console.log(_id, email);
        Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!",
        }).then((result) => {
          if (result.isConfirmed) {
            fetch(`http://localhost:5000/deleterequest/${_id}`, {
              method: "DELETE",
            })
              .then((res) => res.json())
              .then((res) => {
                if (res.deletedCount > 0) {
                  Swal.fire({
                    title: "Success!",
                    text: "Donation Request Deleted succesfully",
                    icon: "success",
                    confirmButtonText: "Cool",
                  });
                  const filtereddata = donation.filter((user) => user._id !== _id);
                  setDoation(filtereddata);
                }
              });
          }
        });
      };

    // useEffect(()=>{
    //     axios.get(`http://localhost:5000/mydonation`)
    //     .then(res=>{
            
    //         const filtreddata=res.data.filter(data=>data.requesterEmail==user?.email)
    //         setDoation(filtreddata)
    //         console.log(donation)
    //     })
    // },[user])
    console.log(donation);
    
  return (
    <div className='w-48'> 
        <table className="table">
    {/* head */}
    <thead>
      <tr className='border'>
        
        <th>Recipient Name</th>
        <th>Recipient location</th>
        <th>Donation date</th>
        <th>Donation time</th>
        <th>Blood group</th>
        <th>Donation status</th>
        <th>Donor information</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
      {
        donation.map((item)=>{
            return <tr className='border'>
            <td>{item.recipientName}</td>
            <td>{item.selecteddistrict},{item.selectedupazila}</td>
            <td>{item.date}</td>
            <td>{item.time}</td>
            <td>{item.bloodGroup}</td>
            <td>{item.donationStatus}</td>
            <td></td>
            <td><Link to={`/dashboard/update-donation-request/${item._id}`} >Edit</Link></td>
            <td><button onClick={()=>{
                handleDelete(item._id)
            }}>Delete</button></td>
            <td><Link to={`/dashboard/details-donation-request/${item._id}`} >View</Link></td>
            
          </tr>
        })
      }
      
    </tbody>
  </table></div>
  )
}

export default MyDonationREquest