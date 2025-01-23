import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../provider/AuthProvider'
import axios from 'axios'
import { Link, useLoaderData } from 'react-router-dom'

const MyDonationREquest = () => {
    const {user}=useContext(AuthContext)
    const [donation,setDoation]=useState([]);
    const data=useLoaderData();
    // 
    useEffect(()=>{
        const filtreddata=data.filter(item=>item.requesterEmail==user?.email)
          setDoation(filtreddata)
    },[data,user])


    const handleDelete=(id)=>{
        console.log(id)
    }

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
        
        <th>requesterName</th>
        <th>recipient location</th>
        <th>donation date</th>
        <th>donation time</th>
        <th>blood group</th>
        <th>donation status</th>
        <th>donor information</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
      {
        donation.map((item)=>{
            return <tr className='border'>
            <td>{item.requesterName}</td>
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
            <td><button>View</button></td>
            
          </tr>
        })
      }
      
    </tbody>
  </table></div>
  )
}

export default MyDonationREquest