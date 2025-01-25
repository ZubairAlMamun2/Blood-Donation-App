import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../provider/AuthProvider'
import axios from 'axios'
import { Link, useLoaderData } from 'react-router-dom'
import Swal from 'sweetalert2'
import { useQuery } from '@tanstack/react-query'

const AllBloodDonationRequest = () => {
     const[fetching,SetFetching]=useState('');
    const {user,userData}=useContext(AuthContext)
    // const [donation,setDoation]=useState([]);
    // const data=useLoaderData();
    // // 

    const { data: donation = [], refetch } = useQuery({
        queryKey: ['donation'],
        queryFn: async () => {
            const res = await axios.get('http://localhost:5000/mydonation');
            return res.data;
        },
        
    })



    
    const handleDelete = (_id) => {
        
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
                  refetch()
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
    const makeDone=(id)=>{

        const donationStatus = "done";
        const formData = {
            donationStatus
        };
        axios
            .put(`http://localhost:5000/changedonatestatus/${id}`, formData, {
              withCredentials: true,
            })
            .then((res) => {
              if (res.data.acknowledged) {
                Swal.fire({
                  title: "Success!",
                  text: "Status Updated succesfully",
                  icon: "success",
                  confirmButtonText: "Cool",
                });  
                //navigate("/donation")         
                refetch()
              }
            });
      }
      const makeCalcele=(id)=>{
        const donationStatus = "canceled";
        const formData = {
            donationStatus
        };
        axios
            .put(`http://localhost:5000/changedonatestatus/${id}`, formData, {
              withCredentials: true,
            })
            .then((res) => {
              if (res.data.acknowledged) {
                Swal.fire({
                  title: "Success!",
                  text: "Status Updated succesfully",
                  icon: "success",
                  confirmButtonText: "Cool",
                });  
                //navigate("/donation")         
                refetch()
              }
            });
      }
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
            return <tr key={item._id} className='border'>
            <td>{item.recipientName}</td>
            <td>{item.selecteddistrict},{item.selectedupazila}</td>
            <td>{item.date}</td>
            <td>{item.time}</td>
            <td>{item.bloodGroup}</td>
            <td>
                  {item.donationStatus == "inprogress" ? (
                    <>
                      <button onClick={()=>{
                        makeDone(item._id)
                      }} className="btn m-1">done</button>
                      <button onClick={()=>{
                        makeCalcele(item._id)
                      }} className="btn">cancel</button>
                    </>
                  ) : (
                    <>{item.donationStatus}</>
                  )}
                </td>
                <td>
                  {item.donationStatus == "inprogress" ? (
                    <p>
                      {item.donorName},{item.donorEmail}
                    </p>
                  ) : (
                    <></>
                  )}
                </td>
            <td>{userData.role=="admin"?<Link to={`/dashboard/update-donation-request/${item._id}`} >Edit</Link>:<></>}</td>
            <td>{userData.role=="admin"?<button onClick={()=>{
                handleDelete(item._id)
            }}>Delete</button>:<></>}</td>
            <td>{userData.role=="admin"?<Link to={`/details-donation-request/${item._id}`} >View</Link>:<></>}</td>
            
          </tr>
        })
      }
      
    </tbody>
  </table></div>
  )
}


export default AllBloodDonationRequest