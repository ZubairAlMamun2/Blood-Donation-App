import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { Link } from "react-router-dom";

const SearchDonor = () => {
  const [type, setType] = useState("");
  const [district, setDistrict] = useState("");
  const [districts, setDistricts] = useState([]);
  const [upazila, setUpazila] = useState("");
  const [upazilas, setUpazilas] = useState([]);
  const [filteredUpazilas, setFilteredUpazilas] = useState([]);
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    fetch("/district.json")
      .then((res) => res.json())
      .then((data) => setDistricts(data));

    fetch("/upazila.json")
      .then((res) => res.json())
      .then((data) => setUpazilas(data));
  }, []);

  useEffect(() => {
    const selectedDistrict = districts.find((d) => d.name === district);
    if (selectedDistrict) {
      setFilteredUpazilas(upazilas.filter((u) => u.district_id === selectedDistrict.id));
    }
  }, [district, districts, upazilas]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.get("https://blood-donation-xi-two.vercel.app/all-user", { withCredentials: true });
      const filteredDonors = res.data.filter(
        (user) => user.role === "donor" && user.bloodGroup === type && user.selecteddistrict === district && user.selectedupazila === upazila
      );
      setDonors(filteredDonors);
    } catch (error) {
      console.error("Error fetching donors:", error);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center py-10 px-4">
      <Link to="/" className="mb-4 px-5 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-500 transition">
        Go Back
      </Link>
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg">
        <h2 className="text-2xl font-semibold text-center text-red-600 mb-4">Search Donor</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Blood Group</label>
            <select className="w-full p-2 border rounded" value={type} onChange={(e) => setType(e.target.value)} required>
              <option value="" disabled>Select Blood Group</option>
              {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((bg) => (
                <option key={bg} value={bg}>{bg}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium">District</label>
            <select className="w-full p-2 border rounded" value={district} onChange={(e) => setDistrict(e.target.value)} required>
              <option value="" disabled>Select District</option>
              {districts.map((d) => (
                <option key={d.id} value={d.name}>{d.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium">Upazila</label>
            <select className="w-full p-2 border rounded" value={upazila} onChange={(e) => setUpazila(e.target.value)} required>
              <option value="" disabled>Select Upazila</option>
              {filteredUpazilas.map((u) => (
                <option key={u.id} value={u.name}>{u.name}</option>
              ))}
            </select>
          </div>

          <button className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-500 transition">Search</button>
        </form>
      </div>

      {loading ? (
        <div className="mt-6 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-red-500 border-t-transparent"></div>
        </div>
      ) : donors.length > 0 ? (
        <div className="mt-6 w-full max-w-2xl bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold text-center mb-4 text-red-600">Donor Information</h3>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-red-100">
                <th className="border p-2">Photo</th>
                <th className="border p-2">Email</th>
                <th className="border p-2">Name</th>
              </tr>
            </thead>
            <tbody>
              {donors.map((donor) => (
                <tr key={donor._id} className="text-center border">
                  <td className="border p-2">
                    <img src={donor.photo} alt="User" className="w-10 h-10 rounded-full mx-auto" />
                  </td>
                  <td className="border p-2">{donor.email}</td>
                  <td className="border p-2">{donor.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
    </div>
  );
};

export default SearchDonor;
