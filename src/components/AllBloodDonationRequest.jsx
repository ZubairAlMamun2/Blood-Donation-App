import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import axios from "axios";
import { Link, useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "./UseAxiosSecure";

const AllBloodDonationRequest = () => {
  const [fetching, SetFetching] = useState("");
  const { user, userData } = useContext(AuthContext);
  const axiossecure = UseAxiosSecure();

  const { data: donation = [], refetch } = useQuery({
    queryKey: ["donation"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:5000/mydonation");
      return res.data;
    },
  });

  const [filter, setFilter] = useState("all"); // State to store the selected filter
  const [currentPage, setCurrentPage] = useState(1); // Current page state
  const rowsPerPage = 5; // Number of rows per page

  // Handle dropdown change
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
    setCurrentPage(1); // Reset to page 1 when filter changes
  };

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
              refetch();
            }
          });
      }
    });
  };

  // Filter donations based on the selected filter
  const filteredDonations = donation.filter((donation) => {
    if (filter === "all") return true; // Show all donations
    return donation.donationStatus === filter; // Show donations matching the selected status
  });

  // Calculate the total number of pages based on filtered donations
  const totalPages = Math.ceil(filteredDonations.length / rowsPerPage);

  // Determine the data to display on the current page
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentDonations = filteredDonations.slice(
    indexOfFirstRow,
    indexOfLastRow
  );

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const makeDone = (id) => {
    const donationStatus = "done";
    const formData = { donationStatus };
    axios
      .put(`http://localhost:5000/changedonatestatus/${id}`, formData, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.acknowledged) {
          Swal.fire({
            title: "Success!",
            text: "Status Updated successfully",
            icon: "success",
            confirmButtonText: "Cool",
          });
          refetch();
        }
      });
  };

  const makeCancel = (id) => {
    const donationStatus = "canceled";
    const formData = { donationStatus };
    axios
      .put(`http://localhost:5000/changedonatestatus/${id}`, formData, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.acknowledged) {
          Swal.fire({
            title: "Success!",
            text: "Status Updated successfully",
            icon: "success",
            confirmButtonText: "Cool",
          });
          refetch();
        }
      });
  };

  return (
    <div className="container mx-auto p-2 bg-white shadow-lg rounded-lg min-h-screen">
      <div className="flex justify-between items-center py-4 mb-6 flex-wrap">
        <h1 className="text-2xl font-semibold text-red-600">Donation Requests</h1>

        {/* Dropdown for filtering */}
        <select
          value={filter}
          onChange={handleFilterChange}
          className="p-2 border rounded-md focus:ring-2 focus:ring-red-600 mt-4 sm:mt-0"
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="inprogress">In Progress</option>
          <option value="done">Done</option>
          <option value="canceled">Canceled</option>
        </select>
      </div>

      <div className="overflow-x-auto"><table className="w-full border border-gray-300">
        {/* Head */}
        <thead>
          <tr className="bg-red-600 text-white">
            <th className="py-2 px-4 text-left">Recipient Name</th>
            <th className="py-2 px-4 text-left">Recipient Location</th>
            <th className="py-2 px-4 text-left">Donation Date</th>
            <th className="py-2 px-4 text-left">Donation Time</th>
            <th className="py-2 px-4 text-left">Blood Group</th>
            <th className="py-2 px-4 text-left">Donation Status</th>
            <th className="py-2 px-4 text-left">Donor Information</th>
            <th className="py-2 px-4 text-left">Actions</th>
            <th className="py-2 px-4 text-left"></th>
          </tr>
        </thead>
        <tbody>
          {currentDonations.length > 0 ? (
            currentDonations.map((item) => (
              <tr key={item._id} className="border-b">
                <td className="py-2 px-4">{item.recipientName}</td>
                <td className="py-2 px-4">
                  {item.selecteddistrict}, {item.selectedupazila}
                </td>
                <td className="py-2 px-4">{item.date}</td>
                <td className="py-2 px-4">{item.time}</td>
                <td className="py-2 px-4">{item.bloodGroup}</td>
                <td className="py-2 px-4">
                  {item.donationStatus === "inprogress" ? (
                    <>
                      <div className="mx-2"><button
                        onClick={() => makeDone(item._id)}
                        className="bg-green-600 text-white py-1 px-4 rounded-md hover:bg-green-700"
                      >
                        Done
                      </button></div>
                      <div>
                      <button
                        onClick={() => makeCancel(item._id)}
                        className="bg-red-600 text-white py-1 px-4 rounded-md hover:bg-red-700 ml-2"
                      >
                        Cancel
                      </button>
                      </div>
                    </>
                  ) : (
                    item.donationStatus
                  )}
                </td>
                <td className="py-2 px-4">
                  {item.donationStatus === "inprogress" ? (
                    <p>
                      {item.donorName}, {item.donorEmail}
                    </p>
                  ) : (
                    ""
                  )}
                </td>
                <td className="py-2 px-4">
                  {userData.role === "admin" && (
                    <Link
                      to={`/dashboard/update-donation-request/${item._id}`}
                      className="text-blue-600 hover:underline"
                    >
                      Edit
                    </Link>
                  )}
                </td>
                <td className="py-2 px-4">
                  {userData.role === "admin" && (
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="bg-red-600 text-white py-1 px-4 rounded-md hover:bg-red-700"
                    >
                      Delete
                    </button>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="text-center py-4 text-red-500">
                No donations found for the selected filter.
              </td>
            </tr>
          )}
        </tbody>
      </table></div>

      {/* Pagination */}
      <div className="flex justify-center mt-4">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`px-4 py-2 mx-1 rounded-md ${
              currentPage === index + 1
                ? "bg-blue-600 text-white"
                : "bg-gray-300"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AllBloodDonationRequest;
