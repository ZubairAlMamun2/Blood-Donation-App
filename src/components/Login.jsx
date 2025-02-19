import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import app from "../firebase/firebase.config";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Swal from "sweetalert2";
import { AuthContext } from "../provider/AuthProvider";
import axios from "axios";

const Login = () => {
  const [error, setError] = useState("");
  const [passtype, setPasstype] = useState(false);
  const auth = getAuth(app);
  const { isActive, Login, setActive, setUser, resetEmail } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const handleChange = (e) => {
    e.preventDefault();
    const email = e.target.value;
  };

  const handlesubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    Login(email, password)
      .then((result) => {
        setUser(result.user);
        axios.get(`http://localhost:5000/login/${email}`)
          .then(res => res.data.status === "active" ? setActive("true") : setActive("false"));

        setError("");
        navigate(location?.state ? location.state : "/");
        Swal.fire({
          title: 'Success!',
          text: 'User Logged in successfully',
          icon: 'success',
          confirmButtonText: 'Cool'
        });
      })
      .catch((error) => {
        setError(error.message);
        e.target.reset();
      });
  };

  return (
    <div className="min-h-screen flex justify-center -mt-5 items-center bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg p-4 max-w-md w-full">
        <h2 className="text-2xl font-bold text-center text-red-600 mb-4">Login to Your Account</h2>
        <form onSubmit={handlesubmit} className="space-y-4">
          <div className="form-control">
            <label className="label font-semibold">Email</label>
            <input
              name="email"
              type="email"
              value={resetEmail}
              onChange={handleChange}
              placeholder="Enter your email"
              className="input input-bordered w-full p-2 border rounded-md focus:ring-2 focus:ring-red-600"
              required
            />
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
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <button className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition">Login</button>
        </form>
        <p className="text-center text-sm mt-4">
          Don’t Have An Account? <Link className="text-red-500 font-semibold hover:underline" to="/auth/register">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
