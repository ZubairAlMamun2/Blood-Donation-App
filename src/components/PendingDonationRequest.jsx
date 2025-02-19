import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import axios from "axios";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import NavBar from "./NavBar";
import Footer from "./Footer";

const PendingDonationRequest = () => {
  const { user } = useContext(AuthContext);
  const [donation, setDonation] = useState([]);

  // Fetching donations with loading state
  const { data: donations = [], isLoading } = useQuery({
    queryKey: ["donations"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:5000/mydonation");
      return res.data;
    },
  });

  // Filtering pending donations
  useEffect(() => {
    const filtered = donations.filter((item) => item.donationStatus === "pending");
    setDonation(filtered);
  }, [user, donations]);

  return (
    <div className="bg-gray-100 mt-20 min-h-screen">
      <NavBar />
      <div className="container mx-auto px-4 py-6 min-h-screen">
        <h2 className="text-center text-3xl font-bold text-red-600 mb-6">Pending Donation Requests</h2>

        {/* Spinner (Loading) */}
        {isLoading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-red-500 border-t-transparent"></div>
          </div>
        ) : (
          <div className="overflow-x-auto bg-white shadow-md rounded-lg p-4">
            <table className="w-full border-collapse">
              {/* Table Head */}
              <thead>
                <tr className="bg-red-600 text-white text-lg">
                  <th className="py-3 px-4 text-left">Recipient Name</th>
                  <th className="py-3 px-4 text-left">Location</th>
                  <th className="py-3 px-4 text-left">Blood Group</th>
                  <th className="py-3 px-4 text-left">Date</th>
                  <th className="py-3 px-4 text-left">Time</th>
                  <th className="py-3 px-4 text-center">Action</th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody>
                {donation.length > 0 ? (
                  donation.map((item) => (
                    <tr key={item._id} className="border-b hover:bg-gray-100">
                      <td className="py-3 px-4">{item.recipientName}</td>
                      <td className="py-3 px-4">{item.selecteddistrict}, {item.selectedupazila}</td>
                      <td className="py-3 px-4 font-bold text-red-600">{item.bloodGroup}</td>
                      <td className="py-3 px-4">{item.date}</td>
                      <td className="py-3 px-4">{item.time}</td>
                      <td className="py-3 px-4 text-center">
                        <Link 
                          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm transition"
                          to={`/details-donation-request/${item._id}`}
                        >
                          View
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center py-6 text-gray-500">
                      No pending donation requests.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default PendingDonationRequest;
