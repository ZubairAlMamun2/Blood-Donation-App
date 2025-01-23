import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../provider/AuthProvider';
import Swal from 'sweetalert2';

const ProfilePage = () => {
    const{user}=useContext(AuthContext)
    const [isEditable, setIsEditable] = useState(false);
    const [userData, setUserData] = useState(null);

  // Fetch user data from the backend (replace email with the logged-in user's email)
 

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };
  useEffect(() => {
   

        axios.get(`http://localhost:5000/user/${user?.email}`)
        .then(res=> setUserData(res.data))
       
      
   
  }, [user]);
//   console.log(userData)

  // Save updated user data to the backend
  //console.log(user?.email)
  const handleSave = () => {
    axios
      .put(`http://localhost:5000/updateprofile/${userData?._id}`, userData, {
        withCredentials: true,
      })
      .then((res) => {
        // console.log(res.data);
        if (res.data.modifiedCount > 0) {
          Swal.fire({
            title: "Success!",
            text: "User Updated succesfully",
            icon: "success",
            confirmButtonText: "Cool",
          });
        //   navigate(location?.state ? location.state : "/assignments");
        }
      });
  };



  return (
    <div style={{ maxWidth: '600px', margin: 'auto' }}>
      <h2>Profile Page</h2>
      <div style={{ textAlign: 'right' }}>
        {!isEditable ? (
          <button onClick={() => setIsEditable(true)}>Edit</button>
        ) : (
          <button onClick={handleSave}>Save</button>
        )}
      </div>
      <form>
        <div style={{ marginBottom: '10px' }}>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={userData?.name}
            onChange={handleChange}
            disabled={!isEditable}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Email:</label>
          <input type="email" name="email" value={userData?.email} disabled />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Avatar:</label>
          <input
            type="text"
            name="avatar"
            value={userData?.photo}
            onChange={handleChange}
            disabled={!isEditable}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>District:</label>
          <input
            type="text"
            name="selecteddistrict"
            value={userData?.selecteddistrict}
            onChange={handleChange}
            disabled={!isEditable}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Upazila:</label>
          <input
            type="text"
            name="selectedupazila"
            value={userData?.selectedupazila}
            onChange={handleChange}
            disabled={!isEditable}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Blood Group:</label>
          <input
            type="text"
            name="bloodGroup"
            value={userData?.bloodGroup}
            onChange={handleChange}
            disabled={!isEditable}
          />
        </div>
      </form>
    </div>
  );
};

export default ProfilePage;
