import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import Swal from "sweetalert2";

const DonationRequestDetails = () => {
  const [donation, setDonation] = useState(null);
  const { userData } = useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:5000/donation/${id}`)
      .then((res) => setDonation(res.data))
      .catch((error) => console.error("Error fetching donation details:", error));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const donorName = userData.name;
    const donorEmail = userData.email;
    const donationStatus = "inprogress";
    const formData = { donorName, donorEmail, donationStatus };

    axios.put(`http://localhost:5000/donate/${donation?._id}`, formData, {
      withCredentials: true,
    }).then((res) => {
      if (res.data.acknowledged) {
        Swal.fire({
          title: "Success!",
          text: "Request Updated Successfully",
          icon: "success",
          confirmButtonText: "OK",
        });  
        navigate("/donation");         
      }
    });
  };

  if (!donation) {
    return <p className="text-center text-lg font-bold text-gray-600">Loading...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg">
        <Link to="/donation" className="text-red-600 hover:underline text-lg font-semibold mb-4 inline-block">
          &larr; Go Back
        </Link>
        <h2 className="text-2xl font-bold text-red-600 mb-4 text-center">Blood Donation Request Details</h2>
        <div className="space-y-2 text-gray-700">
          <p><strong>Requester:</strong> {donation.requesterName} ({donation.requesterEmail})</p>
          <p><strong>Recipient:</strong> {donation.recipientName}</p>
          <p><strong>Location:</strong> {donation.selecteddistrict}, {donation.selectedupazila}</p>
          <p><strong>Hospital:</strong> {donation.hospitalName}</p>
          <p><strong>Address:</strong> {donation.address}</p>
          <p><strong>Blood Group:</strong> <span className="font-bold text-red-600">{donation.bloodGroup}</span></p>
          <p><strong>Date:</strong> {donation.date}</p>
          <p><strong>Time:</strong> {donation.time}</p>
          <p><strong>Message:</strong> {donation.requestMessage}</p>
        </div>
        <div className="mt-4 text-center">
          <label htmlFor="donate_modal" className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition cursor-pointer">
            Donate
          </label>
        </div>
      </div>

      {/* Modal */}
      <input type="checkbox" id="donate_modal" className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className="modal-box">
          <h3 className="text-xl font-bold text-red-600 mb-4">Confirm Donation</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 font-medium">Donor Name</label>
              <input type="text" value={userData.name} className="input input-bordered w-full" readOnly />
            </div>
            <div>
              <label className="block text-gray-700 font-medium">Donor Email</label>
              <input type="email" value={userData.email} className="input input-bordered w-full" readOnly />
            </div>
            <div className="flex justify-end space-x-2">
              <label htmlFor="donate_modal" className="btn bg-gray-600 text-white">Cancel</label>
              <button type="submit" className="btn bg-red-600 text-white">Confirm</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DonationRequestDetails;
