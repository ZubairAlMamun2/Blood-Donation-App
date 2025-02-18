import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import axios from "axios";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { CiSquareQuestion } from "react-icons/ci";
import { FaUsers } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import { RiMoneyDollarCircleFill } from "react-icons/ri";

const UserHome = () => {
  const { user, userData } = useContext(AuthContext);
  const [donations, setDoations] = useState([]);
  const [filtreddonations, setfiltredDoations] = useState([]);
  
  // Fetch Total Funds
  const { data: funds = [] } = useQuery({
    queryKey: ["funds"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:5000/totalfunds");
      return res.data;
    },
  });

  // Calculate Total Amount
  const totalAmount = funds.reduce(
    (sum, item) => sum + parseFloat(item.amount),
    0
  );

  // Fetch User Donations
  const {
    data: loadeddonations = [],
    refetch,
    isLoading: isDonationsLoading,
  } = useQuery({
    queryKey: ["loadeddonations"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:5000/mydonation");
      return res.data;
    },
  });

  // Fetch Total Donors
  const { data: donor = [] } = useQuery({
    queryKey: ["donor"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:5000/all-user");
      return res.data;
    },
  });

  // Filter Donations for the Logged-in User
  useEffect(() => {
    if (loadeddonations.length > 0 && user) {
      const filtreddata = loadeddonations.filter(
        (item) => item.requesterEmail === user.email
      );
      setDoations(filtreddata);

      const filteredDonations = filtreddata
        .sort((a, b) => new Date(b.currentDate) - new Date(a.currentDate))
        .slice(0, 3);

      setfiltredDoations(filteredDonations);
    }

    refetch(); // Ensure fresh data
  }, [user, loadeddonations, refetch]);

  // Handle Donation Deletion
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
                text: "Donation Request Deleted successfully",
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

  return (
    <div className="container mx-auto  bg-white shadow-lg rounded-lg min-h-screen">
      <div className="my-5">
        <h2 className="text-2xl font-bold text-center text-red-600 mb-4">
          <span>Welcome </span>
          {userData?.name}
        </h2>
      </div>

      {/* Admin or Volunteer Dashboard */}
      {(userData.role === "admin" || userData.role === "volunteer") && (
        <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
          <div className="card border-red-400 border-4 shadow-xl p-6 my-5 grid grid-cols-3 bg-red-100">
            <div className="col-span-1 flex items-center justify-center text-5xl font-bold text-red-600">
              <CiSquareQuestion />
            </div>
            <div className="col-span-2 text-red-600">
              <h2 className="font-semibold">Total Blood Donation Request</h2>
              <p className="text-3xl font-bold">{loadeddonations.length}</p>
            </div>
          </div>

          <div className="card border-red-400 border-4 shadow-xl p-6 my-5 grid grid-cols-3 bg-red-100">
            <div className="col-span-1 flex items-center justify-center text-5xl font-bold text-red-600">
              <FaUsers />
            </div>
            <div className="col-span-2 text-red-600">
              <h2 className="font-semibold">Total Donors</h2>
              <p className="text-3xl font-bold">{donor.length}</p>
            </div>
          </div>

          <div className="card border-red-400 border-4 shadow-xl p-6 my-5 grid grid-cols-3 bg-red-100">
            <div className="col-span-1 flex items-center justify-center text-5xl font-bold text-red-600">
              <RiMoneyDollarCircleFill />
            </div>
            <div className="col-span-2 text-red-600">
              <h2 className="font-semibold">Total Amount</h2>
              <p className="text-3xl font-bold">{totalAmount}</p>
            </div>
          </div>
        </div>
      )}

      {/* Donor Dashboard */}
      {isDonationsLoading ? (
        <p className="text-center text-gray-500">Loading donations...</p>
      ) : (
        filtreddonations.length > 0 &&
        userData.role === "donor" && (
          <div className="overflow-x-auto bg-white shadow-lg">
            <table className="w-full border border-gray-300 text-gray-800">
              <thead className="bg-red-600 text-white">
                <tr>
                  <th className="p-2">Recipient Name</th>
                  <th className="p-2">Location</th>
                  <th className="p-2">Date</th>
                  <th className="p-2">Time</th>
                  <th className="p-2">Blood Group</th>
                  <th className="p-2">Status</th>
                  <th className="p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtreddonations.map((item) => (
                  <tr key={item._id} className="border text-center">
                    <td className="p-2">{item.recipientName}</td>
                    <td className="p-2">{item.selecteddistrict}, {item.selectedupazila}</td>
                    <td className="p-2">{item.date}</td>
                    <td className="p-2">{item.time}</td>
                    <td className="p-2 font-bold">{item.bloodGroup}</td>
                    <td className="p-2">{item.donationStatus}</td>
                    <td className="p-2 flex justify-center space-x-2">
                      <button onClick={() => handleDelete(item._id)} className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700 transition">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      )}
    </div>
  );
};

export default UserHome;
