import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../provider/AuthProvider';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const CreateDonationRequest = () => {
  const [type, setType] = useState("");
  const [district, setDistrict] = useState("");
  const [districtResource, setDistrictResource] = useState([]);
  const [upazila, setUpazila] = useState("");
  const [upazilaResource, setUpazilaResource] = useState([]);
  const { user, userData } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/district.json")
      .then((response) => response.json())
      .then((data) => setDistrictResource(data));
  }, []);

  useEffect(() => {
    fetch("/upazila.json")
      .then((response) => response.json())
      .then((data) => setUpazilaResource(data));
  }, []);

  useEffect(() => {
    const filteredDistrict = districtResource.find((d) => d.name === district);
    if (filteredDistrict) {
      setUpazilaResource(
        upazilaResource.filter((u) => u.district_id === filteredDistrict.id)
      );
    }
  }, [district, districtResource]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userData.status === "blocked") {
      Swal.fire("Sorry!", "You are not an active user", "error");
      return;
    }

    const formData = new FormData(e.target);
    const donationRequest = {
      requesterEmail: formData.get("requester-email"),
      requesterName: formData.get("requester-name"),
      recipientName: formData.get("recipient-name"),
      hospitalName: formData.get("hospital-name"),
      address: formData.get("address"),
      date: formData.get("date"),
      time: formData.get("time"),
      requestMessage: formData.get("request-message"),
      bloodGroup: type,
      selectedDistrict: district,
      selectedUpazila: upazila,
      donationStatus: "pending",
      currentDate: new Date().toISOString(),
    };

    axios
      .post("https://blood-donation-xi-two.vercel.app/createnewdonationrequest", donationRequest, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.acknowledged) {
          Swal.fire("Success!", "Request created successfully", "success");
          navigate("/dashboard/home");
        }
      });
  };

  return (
    <div className="min-h-screen flex justify-center items-center   bg-white shadow-lg rounded-lg">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg">
        <h2 className="text-2xl font-semibold text-center text-red-600 mb-6">
          Create Donation Request
        </h2>
        <form  onSubmit={handleSubmit}>
          <div className="space-y-4">
            <input
              name="requester-name"
              type="text"
              
              value={userData?.name || ""}
              className="input input-bordered w-full bg-white"
              readOnly
            />
            <input
              name="requester-email"
              type="email"
              value={user?.email || ""}
              className="input input-bordered w-full bg-white"
              readOnly
            />
            <input
              name="recipient-name"
              type="text"
              placeholder="Recipient Name"
              className="input input-bordered w-full bg-white"
              required
            />
            <select
              onChange={(e) => setDistrict(e.target.value)}
              value={district}
              className="select select-bordered w-full bg-white"
              required
            >
              <option value="">Select District</option>
              {districtResource.map((d) => (
                <option key={d.id} value={d.name}>{d.name}</option>
              ))}
            </select>
            <select
              onChange={(e) => setUpazila(e.target.value)}
              value={upazila}
              className="select select-bordered w-full bg-white"
              required
            >
              <option value="">Select Upazila</option>
              {upazilaResource.map((u) => (
                <option key={u.id} value={u.name}>{u.name}</option>
              ))}
            </select>
            <input
              name="hospital-name"
              type="text"
              placeholder="Hospital Name"
              className="input input-bordered w-full bg-white"
              required
            />
            <input
              name="address"
              type="text"
              placeholder="Address"
              className="input input-bordered w-full bg-white"
              required
            />
            <select
              onChange={(e) => setType(e.target.value)}
              value={type}
              className="select select-bordered w-full bg-white"
              required
            >
              <option value="">Select Blood Group</option>
              {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map((bg) => (
                <option key={bg} value={bg}>{bg}</option>
              ))}
            </select>
            <input
              name="date"
              type="date"
              className="input input-bordered w-full bg-white"
              required
            />
            <input
              name="time"
              type="time"
              className="input input-bordered w-full bg-white"
              required
            />
            <textarea
              name="request-message"
              placeholder="Request Message"
              className="textarea textarea-bordered w-full bg-white"
              required
            ></textarea>
            <button className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700">
              Submit Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateDonationRequest;
