import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import Swal from "sweetalert2";

const DonationRequstDetails = () => {
  const [donation, setDonation] = useState([]);
  const { userData } = useContext(AuthContext);
  const { id } = useParams();
  const navigate =useNavigate()
  useEffect(() => {
    axios
      .get(`http://localhost:5000/donation/${id}`)
      .then((res) => setDonation(res.data));
  }, []);
  console.log(donation);
  const handleSubmit = (e) => {
    e.preventDefault();
    const donorName = userData.name;
    const donorEmail = userData.email;
    const donationStatus = "inprogress";
    const formData = {
        donorName,
        donorEmail,
        donationStatus
    };
    axios
        .put(`http://localhost:5000/donate/${donation?._id}`, formData, {
          withCredentials: true,
        })
        .then((res) => {
          if (res.data.acknowledged) {
            Swal.fire({
              title: "Success!",
              text: "Request Updated succesfully",
              icon: "success",
              confirmButtonText: "Cool",
            });  
            navigate("/donation")         
           
          }
        });
  };
  return (
    <div>
      <div className="flex justify-center items-center">
        <div className="card  bg-base-100 w-96 shadow-xl">
          <Link
            to="/donation"
            className="text-lg my-2  btn btn-primary btn-sm font-semibold text-center"
          >
            Go Back
          </Link>
          <div className="card-body">
            <h2 className="card-title mb-2">Blood Donation Request Details</h2>
            <p>Requester Name:{donation.requesterName}</p>
            <p>Requester Email:{donation.requesterEmail}</p>
            <p>Recipient Name:{donation.recipientName}</p>
            <p>Receipt District:{donation.selecteddistrict}</p>
            <p>Receipt Upazila:{donation.selectedupazila}</p>
            <p>Hospital Name:{donation.hospitalName}</p>
            <p>Address:{donation.address}</p>
            <p>Blood group:{donation.bloodGroup}</p>
            <p>Donation Date:{donation.date}</p>
            <p>Donation Time:{donation.time}</p>
            <p>Request Message:{donation.requestMessage}</p>
            <div className="card-actions justify-end">
              <label htmlFor="my_modal_6" className="btn btn-primary btn-sm">
                Donate
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Put this part before </body> tag */}
      <input type="checkbox" id="my_modal_6" className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className="modal-box">
          <form onSubmit={handleSubmit} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Donor Name</span>
              </label>
              <input
                type="text"
                name="donor-name"
                placeholder="Your Name"
                value={userData.name}
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Donor Email</span>
              </label>
              <input
                type="email"
                name="donor-email"
                placeholder="Email"
                value={userData.email}
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control mt-6">
              <button  className="btn btn-primary btn-sm">
                 <label htmlFor="my_modal_6">Donate</label>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DonationRequstDetails;
