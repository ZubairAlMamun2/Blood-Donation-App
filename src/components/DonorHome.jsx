import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import axios from "axios";
import { Link, useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";

const DonorHome = () => {
  const { user, userData } = useContext(AuthContext);
  const [donations, setDoations] = useState([]);
  const [filtreddonations, setfiltredDoations] = useState([]);

  const data = useLoaderData();
  //
  useEffect(() => {
    const filtreddata = data.filter(
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
  }, [data, user]);

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
        filtreddonations.length>0?<div className=" w-48">
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
      <div className="my-5">
        {userData.role=="donor"?<Link className="btn btn-primary" to="/dashboard/my-donation-requests">
        view my all
        request
        </Link>:<Link className="btn btn-primary" to="/dashboard/all-blood-donation-request">
        view all blood
        request
        </Link>}
      </div>
    </div>
  );
};

export default DonorHome;
