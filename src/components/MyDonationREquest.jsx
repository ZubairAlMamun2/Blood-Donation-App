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
  const itemsPerPage = 5; // Number of items per page

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
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`http://localhost:5000/deleterequest/${_id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            Swal.fire("Deleted!", "Your request has been deleted.", "success");
            refetch();
          }
        });
      }
    });
  };

  const updateStatus = (id, status) => {
    axios.put(`http://localhost:5000/changedonatestatus/${id}`, { donationStatus: status })
      .then((res) => {
        if (res.data.acknowledged) {
          Swal.fire("Updated!", "Donation status has been updated.", "success");
          refetch();
        }
      });
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentDonations = donation.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(donation.length / itemsPerPage);

  return (
    <div className="min-h-screen bg-gray-100  flex justify-center">
      <div className="bg-white shadow-lg rounded-lg  w-full ">
        <h2 className="text-2xl font-bold text-center text-red-600 mb-4">
          My Donation Requests
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full border border-gray-300">
            <thead className="bg-red-600 text-white">
              <tr>
                <th className="p-2">Recipient</th>
                <th className="p-2">Location</th>
                <th className="p-2">Date</th>
                <th className="p-2">Time</th>
                <th className="p-2">Blood Group</th>
                <th className="p-2">Status</th>
                <th className="p-2">Donor</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentDonations.map((item) => (
                <tr key={item._id} className="border text-center">
                  <td className="p-2">{item.recipientName}</td>
                  <td className="p-2">
                    {item.selecteddistrict}, {item.selectedupazila}
                  </td>
                  <td className="p-2">{item.date}</td>
                  <td className="p-2">{item.time}</td>
                  <td className="p-2 font-bold">{item.bloodGroup}</td>
                  <td className="p-2">
                    {item.donationStatus === "inprogress" ? (
                      <div className="flex justify-center space-x-2">
                        <button
                          onClick={() => updateStatus(item._id, "done")}
                          className="bg-green-600 text-white px-3 py-1 rounded-md hover:bg-green-700 transition"
                        >
                          Done
                        </button>
                        <button
                          onClick={() => updateStatus(item._id, "canceled")}
                          className="bg-yellow-600 text-white px-3 py-1 rounded-md hover:bg-yellow-700 transition"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <span className={`px-2 py-1 rounded-md text-black ${
                        item.donationStatus
                      }`}>
                        {item.donationStatus}
                      </span>
                    )}
                  </td>
                  <td className="p-2">
                    {item.donationStatus === "inprogress" && (
                      <p>{item.donorName}, {item.donorEmail}</p>
                    )}
                  </td>
                  <td className="p-2 flex justify-center space-x-2">
                    <Link
                      to={`/dashboard/update-donation-request/${item._id}`}
                      className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700 transition"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700 transition"
                    >
                      Delete
                    </button>
                    <Link
                      to={`/details-donation-request/${item._id}`}
                      className="btn btn-sm bg-blue-500 text-white hover:bg-blue-600"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-4 space-x-4">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition"
            >
              Previous
            </button>
            <span className="text-lg font-bold">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyDonationRequest;
