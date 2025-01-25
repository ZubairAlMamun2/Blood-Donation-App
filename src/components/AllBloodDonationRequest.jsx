import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import axios from "axios";
import { Link, useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";

const AllBloodDonationRequest = () => {
    const [fetching, SetFetching] = useState("");
    const { user, userData } = useContext(AuthContext);
  
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
      <div className="w-48">
        <div>
          <h1>Donation Requests</h1>
  
          {/* Dropdown for filtering */}
          <select
            value={filter}
            onChange={handleFilterChange}
            className="p-2 border rounded mb-4"
          >
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="inprogress">In Progress</option>
            <option value="done">Done</option>
            <option value="canceled">Canceled</option>
          </select>
        </div>
  
        <table className="table w-48">
          {/* Head */}
          <thead>
            <tr className="border">
              <th>Recipient Name</th>
              <th>Recipient Location</th>
              <th>Donation Date</th>
              <th>Donation Time</th>
              <th>Blood Group</th>
              <th>Donation Status</th>
              <th>Donor Information</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {currentDonations.length > 0 ? (
              currentDonations.map((item) => (
                <tr key={item._id} className="border">
                  <td>{item.recipientName}</td>
                  <td>
                    {item.selecteddistrict}, {item.selectedupazila}
                  </td>
                  <td>{item.date}</td>
                  <td>{item.time}</td>
                  <td>{item.bloodGroup}</td>
                  <td>
                    {item.donationStatus === "inprogress" ? (
                      <>
                        <button
                          onClick={() => makeDone(item._id)}
                          className="btn m-1"
                        >
                          Done
                        </button>
                        <button
                          onClick={() => makeCancel(item._id)}
                          className="btn"
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      item.donationStatus
                    )}
                  </td>
                  <td>
                    {item.donationStatus === "inprogress" ? (
                      <p>
                        {item.donorName}, {item.donorEmail}
                      </p>
                    ) : (
                      ""
                    )}
                  </td>
                  <td>
                    {userData.role === "admin" && (
                      <Link to={`/dashboard/update-donation-request/${item._id}`}>
                        Edit
                      </Link>
                    )}
                  </td>
                  <td>
                    {userData.role === "admin" && (
                      <button onClick={() => handleDelete(item._id)}>
                        Delete
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <p>No donations found for the selected filter.</p>
            )}
          </tbody>
        </table>
  
        {/* Pagination */}
        <div className="flex justify-center mt-4">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={`px-4 py-2 mx-1 rounded ${
                currentPage === index + 1
                  ? "bg-blue-500 text-white"
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
  

