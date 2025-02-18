import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../provider/AuthProvider';
import Swal from 'sweetalert2';

const ProfilePage = () => {
  const { user } = useContext(AuthContext);
  const [isEditable, setIsEditable] = useState(false);
  const [userData, setUserData] = useState(null);

  // Fetch user data from the backend (replace email with the logged-in user's email)
  useEffect(() => {
    axios.get(`http://localhost:5000/user/${user?.email}`)
      .then(res => setUserData(res.data));
  }, [user]);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Save updated user data to the backend
  const handleSave = () => {
    axios
      .put(`http://localhost:5000/updateprofile/${userData?._id}`, userData, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          setIsEditable(false);
          Swal.fire({
            title: "Success!",
            text: "User updated successfully",
            icon: "success",
            confirmButtonText: "Cool",
          });
        }
      });
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold text-center text-red-600 mb-6">Profile Page</h2>
      
      {/* Edit / Save Button */}
      <div className="flex justify-end mb-6">
        {!isEditable ? (
          <button
            onClick={() => setIsEditable(true)}
            className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition"
          >
            Edit
          </button>
        ) : (
          <button
            onClick={handleSave}
            className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition"
          >
            Save
          </button>
        )}
      </div>

      <form>
        {/* Name Field */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Name:</label>
          <input
            type="text"
            name="name"
            value={userData?.name}
            onChange={handleChange}
            disabled={!isEditable}
            className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
          />
        </div>

        {/* Email Field */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Email:</label>
          <input
            type="email"
            name="email"
            value={userData?.email}
            disabled
            className="w-full px-3 py-2 mt-1 border rounded-md bg-gray-100 cursor-not-allowed"
          />
        </div>

        {/* Avatar Field */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Avatar:</label>
          <input
            type="text"
            name="photo"
            value={userData?.photo}
            onChange={handleChange}
            disabled={!isEditable}
            className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
          />
        </div>

        {/* District Field */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">District:</label>
          <input
            type="text"
            name="selecteddistrict"
            value={userData?.selecteddistrict}
            onChange={handleChange}
            disabled={!isEditable}
            className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
          />
        </div>

        {/* Upazila Field */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Upazila:</label>
          <input
            type="text"
            name="selectedupazila"
            value={userData?.selectedupazila}
            onChange={handleChange}
            disabled={!isEditable}
            className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
          />
        </div>

        {/* Blood Group Field */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Blood Group:</label>
          <input
            type="text"
            name="bloodGroup"
            value={userData?.bloodGroup}
            onChange={handleChange}
            disabled={!isEditable}
            className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
          />
        </div>
      </form>
    </div>
  );
};

export default ProfilePage;
