import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import axios from "axios";
import { Link, useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";
import { CiSquareQuestion } from "react-icons/ci";
import { FaUsers } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import { RiMoneyDollarCircleFill } from "react-icons/ri";

const UserHome = () => {
    const [countuser, setcountuser] = useState([]);
  const { user, userData } = useContext(AuthContext);
  const [donations, setDoations] = useState([]);
  const [filtreddonations, setfiltredDoations] = useState([]);
  const { data: funds = [], refetch3 } = useQuery({
    queryKey: ["funds"],
    queryFn: async () => {
      const res = await axios.get("https://blood-donation-xi-two.vercel.app/totalfunds");
      return res.data;
    },
  });
  const totalAmount = funds.reduce((sum, item) => sum + parseFloat(item.amount), 0);

console.log(`Total Amount: ${totalAmount}`); 

  const { data: loadeddonations = [], refetch } = useQuery({
    queryKey: ['loadeddonations'],
    queryFn: async () => {
        const res = await axios.get('https://blood-donation-xi-two.vercel.app/mydonation');
        return res.data;
    },
    
})

 
  const { data: donor = [], refetch2 } = useQuery({
    queryKey: ['donor'],
    queryFn: async () => {
        const res = await axios.get('https://blood-donation-xi-two.vercel.app/all-user');
        return res.data
    },
    
})
 useEffect(() => {
        
        const donors=donor.filter(item=>item.role=="donor")
        setcountuser(donors)
      
  }, [donor]);
  //
  useEffect(() => {
    const filtreddata = loadeddonations.filter(
      (item) => item.requesterEmail == user?.email
    );
    setDoations(filtreddata);
    const filteredDonations = filtreddata
      .sort((a, b) => {
        return new Date(b.currentDate) - new Date(a.currentDate);
      })
      .slice(0, 3);
    console.log(filteredDonations);
    setfiltredDoations(filteredDonations);
  }, [ user]);

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
        fetch(`https://blood-donation-xi-two.vercel.app/deleterequest/${_id}`, {
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
              const filtereddata = donations.filter((user) => user._id !== _id);
              setDoations(filtereddata);
            }
          });
      }
    });
  };

  console.log(donations);

  return (
    <div>
      <div className="my-5">
        <h2 className="text-3xl">
          <span>Welcome </span>
          {userData?.name}
        </h2>
      </div>
      {
        userData.role=="admin"||userData.role=="volunteer"? <div className="grid gap-2 grid-cols-1 lg:grid-cols-2">
          <div className="card border-red-400 border-4 shadow-xl p-2 my-5 grid grid-cols-3">
            <div className="col-span-1 flex items-center justify-center text-5xl font-bold"><CiSquareQuestion /></div>
            <div className="col-span-2 "><h2 className=" font-semibold ">Total Blood Donation Request</h2>
            <p className="text-3xl font-bold">{loadeddonations.length}</p></div>
          </div>
          <div className="card border-red-400 border-4 shadow-xl p-2 my-5 grid grid-cols-3">
            <div className="col-span-1 flex items-center justify-center text-5xl font-bold"><FaUsers /></div>
            <div className="col-span-2 "><h2 className=" font-semibold ">Total Donor</h2>
            <p className="text-3xl font-bold">{countuser.length}</p></div>
          </div>
          <div className="card border-red-400 border-4 shadow-xl p-2 my-5 grid grid-cols-3">
            <div className="col-span-1 flex items-center justify-center text-5xl font-bold"><RiMoneyDollarCircleFill /></div>
            <div className="col-span-2 "><h2 className=" font-semibold ">Total Amount</h2>
            <p className="text-3xl font-bold">{totalAmount}</p></div>
          </div>
          
        </div>:<></>
      }


      {
        filtreddonations.length>0&&userData.role=="donor"?<div className=" w-48">
        <table className="table">
          <thead>
            <tr className="border">
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
            {filtreddonations.map((item) => {
              return (
                <tr key={item._id} className="border">
                  <td>{item.recipientName}</td>
                  <td>
                    {item.selecteddistrict},{item.selectedupazila}
                  </td>
                  <td>{item.date}</td>
                  <td>{item.time}</td>
                  <td>{item.bloodGroup}</td>
                  <td>{item.donationStatus}</td>
                  <td></td>
                  <td>
                    <Link to={`/dashboard/update-donation-request/${item._id}`}>
                      Edit
                    </Link>
                  </td>
                  <td>
                    <button
                      onClick={() => {
                        handleDelete(item._id);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                  <td>
                    <Link
                      to={`/dashboard/details-donation-request/${item._id}`}
                    >
                      View
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>:<></>
      }


      {
        userData.role=="donor"?<div className="my-5">
        {userData.role=="donor"?<Link className="btn btn-primary btn-sm" to="/dashboard/my-donation-requests">
        view my all
        request
        </Link>:<Link className="btn btn-primary btn-sm" to="/dashboard/all-blood-donation-request">
        view all blood
        request
        </Link>}
      </div>:<></>
      }
    </div>
  );
};

export default UserHome;
