import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import axios from "axios";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";

const MyDonationRequest = () => {
  const { user } = useContext(AuthContext);
  const [donation, setDonation] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // Number of items per page

  const { data: donations = [], refetch } = useQuery({
    queryKey: ["donations"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:5000/mydonation");
      return res.data;
    },
  });

  useEffect(() => {
    const filteredData = donations.filter(
      (item) => item.requesterEmail === user?.email
    );
    setDonation(filteredData);
  }, [donations, user]);

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

  const makeDone = (id) => {
    const donationStatus = "done";
    axios
      .put(`http://localhost:5000/changedonatestatus/${id}`, { donationStatus })
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
    axios
      .put(`http://localhost:5000/changedonatestatus/${id}`, { donationStatus })
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

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentDonations = donation.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(donation.length / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="w-48">
      <table className="table">
        {/* head */}
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
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {currentDonations.map((item) => (
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
                  <>{item.donationStatus}</>
                )}
              </td>
              <td>
                {item.donationStatus === "inprogress" ? (
                  <p>
                    {item.donorName}, {item.donorEmail}
                  </p>
                ) : null}
              </td>
              <td>
                <Link to={`/dashboard/update-donation-request/${item._id}`}>
                  Edit
                </Link>
              </td>
              <td>
                <button onClick={() => handleDelete(item._id)}>Delete</button>
              </td>
              <td>
                <Link to={`/details-donation-request/${item._id}`}>View</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-4">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="btn"
        >
          Previous
        </button>
        <span className="px-4">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="btn"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default MyDonationRequest;
