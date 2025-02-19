import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { getAuth } from "firebase/auth";
import app from "../firebase/firebase.config";
import Swal from "sweetalert2";
import { AuthContext } from "../provider/AuthProvider";
import axios from "axios";

const Register = () => {
  const [type, setType] = useState("");
  const [district, setDistrict] = useState("");
  const [districtreasorce, setDistrictreasorce] = useState([""]);
  const [upazila, setUpazila] = useState("");
  const [upazilareasorce2, setUpazilareasorce2] = useState([""]);
  const [upazilareasorce, setUpazilareasorce] = useState([""]);
  const auth = getAuth(app);
  const { createNewUser, setUser, Logout, UpdateUserProfile } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [passtype, setPasstype] = useState(false);
  const [passtypec, setPasstypec] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    fetch("/district.json")
      .then((response) => response.json())
      .then((data) => setDistrictreasorce(data));
  }, []);
  
  useEffect(() => {
    fetch("/upazila.json")
      .then((response) => response.json())
      .then((data) => setUpazilareasorce2(data));
  }, []);
  
  useEffect(() => {
    const filtreddata1 = districtreasorce.filter((data) => data.name === district);
    const filtreddata2 = upazilareasorce2.filter((data) => data.district_id === filtreddata1[0]?.id);
    setUpazilareasorce(filtreddata2);
  }, [district]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const email = form.get("email");
    const name = form.get("name");
    const photo = form.get("photo");
    const bloodGroup = type;
    const selecteddistrict = district;
    const selectedupazila = upazila;
    const status = "active";
    const role = "donor";
    const formData = { email, name, bloodGroup, selecteddistrict, selectedupazila, status, role, photo };

    const password = form.get("password");
    const comfirmpassword = form.get("Confirmpassword");

    if (password !== comfirmpassword) {
      setError("Passwords must match");
      return;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (!passwordRegex.test(password)) {
      setError("Password must have at least one uppercase letter, one lowercase letter, and be at least 6 characters long.");
      return;
    }

    createNewUser(email, password)
      .then((result) => {
        setError("");
        UpdateUserProfile({ displayName: name, photoURL: photo }).then(() => {
          axios.post("https://blood-donation-xi-two.vercel.app/addnewuser", formData, { withCredentials: true })
            .then((res) => {
              if (res.data.acknowledged) {
                Swal.fire({
                  title: "Success!",
                  text: "User registered successfully",
                  icon: "success",
                  confirmButtonText: "Cool"
                });
                navigate("/auth/login");
                Logout();
              }
            });
        });
      })
      .catch((error) => {
        setError(error.message);
        e.target.reset();
      });
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg p-4 max-w-md w-full">
        <h2 className="text-2xl font-bold text-center text-red-600 mb-4">Register your account</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-control">
            <label className="label font-semibold">Email</label>
            <input
              name="email"
              type="email"
              placeholder="Enter your email"
              className="input input-bordered w-full p-2 border rounded-md focus:ring-2 focus:ring-red-600"
              required
            />
          </div>

          <div className="form-control">
            <label className="label font-semibold">Your Name</label>
            <input
              name="name"
              type="text"
              placeholder="Enter your name"
              className="input input-bordered w-full p-2 border rounded-md focus:ring-2 focus:ring-red-600"
              required
            />
          </div>

          <div className="form-control">
            <label className="label font-semibold">Avatar</label>
            <input
              name="photo"
              type="text"
              placeholder="Enter photo URL"
              className="input input-bordered w-full p-2 border rounded-md focus:ring-2 focus:ring-red-600"
              required
            />
          </div>

          <div className="form-control">
            <label className="label font-semibold">Blood Group</label>
            <select
              onChange={(e) => setType(e.target.value)}
              value={type}
              className="input input-bordered w-full p-2 border rounded-md focus:ring-2 focus:ring-red-600"
              required
            >
              <option disabled value="">Select Blood group</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
          </div>

          <div className="form-control">
            <label className="label font-semibold">District</label>
            <select
              onChange={(e) => setDistrict(e.target.value)}
              value={district}
              className="input input-bordered w-full p-2 border rounded-md focus:ring-2 focus:ring-red-600"
              required
            >
              <option disabled value="">Select District</option>
              {districtreasorce.map((option) => (
                <option key={option.id} value={option.name}>{option.name}</option>
              ))}
            </select>
          </div>

          <div className="form-control">
            <label className="label font-semibold">Upazila</label>
            <select
              onChange={(e) => setUpazila(e.target.value)}
              value={upazila}
              className="input input-bordered w-full p-2 border rounded-md focus:ring-2 focus:ring-red-600"
              required
            >
              <option disabled value="">Select Upazila</option>
              {upazilareasorce.map((option) => (
                <option key={option.id} value={option.name}>{option.name}</option>
              ))}
            </select>
          </div>

          <div className="form-control relative">
            <label className="label font-semibold">Password</label>
            <input
              name="password"
              type={passtype ? "text" : "password"}
              placeholder="Enter your password"
              className="input input-bordered w-full p-2 border rounded-md focus:ring-2 focus:ring-red-600"
              required
            />
            <span
              onClick={() => setPasstype(!passtype)}
              className="absolute right-4 top-12 text-gray-500 cursor-pointer"
            >
              {passtype ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <div className="form-control relative">
            <label className="label font-semibold">Confirm Password</label>
            <input
              name="Confirmpassword"
              type={passtypec ? "text" : "password"}
              placeholder="Confirm your password"
              className="input input-bordered w-full p-2 border rounded-md focus:ring-2 focus:ring-red-600"
              required
            />
            <span
              onClick={() => setPasstypec(!passtypec)}
              className="absolute right-4 top-12 text-gray-500 cursor-pointer"
            >
              {passtypec ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <button type="submit" className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition">
            Register
          </button>
        </form>

        <p className="text-center text-sm mt-4">
          Already have an account? <Link className="text-red-500 font-semibold hover:underline" to="/auth/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
