import React, { useContext, useEffect, useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
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
  const { createNewUser, setUser,Logout, UpdateUserProfile } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [passtype, setPasstype] = useState(false);
  const [passtypec, setPasstypec] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    fetch("/district.json")
      .then((response) => response.json())
      .then((data) => {
        //console.log(data[0])
        setDistrictreasorce(data);
      });
  }, []);
  useEffect(() => {
    fetch("/upazila.json")
      .then((response) => response.json())
      .then((data) => {
        //console.log(data[0])

        setUpazilareasorce2(data);
      });
  }, []);

  useEffect(() => {
    const filtreddata1 = districtreasorce.filter(
      (data) => data.name == district
    );
    const filtreddata2 = upazilareasorce2.filter(
      (data) => data.district_id == filtreddata1[0]?.id
    );
    // console.log(filtreddata1[0].id)
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

    const formData = {
      email,
      name,
      bloodGroup,
      selecteddistrict,
      selectedupazila,
      status,
      role,
      photo,
    };
    console.log(formData)

    const password = form.get("password");
    const comfirmpassword = form.get("Confirmpassword");
    if (password !== comfirmpassword) {
      setError("Must be same Password");
      return;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

    if (!passwordRegex.test(password)) {
      setError(
        "Must have an Uppercase letter,a Lowercase letter and must be at least 6 character"
      );
      return;
    }

    createNewUser(email, password)
      .then((result) => {
        // setUser(result.user);
        // console.log(result.user)
        setError("");

        UpdateUserProfile({ displayName: name, photoURL: photo }).then(
          (res) => {
            
            axios
              .post(
                `http://localhost:5000/addnewuser`,
                formData,
                { withCredentials: true }
              )

              .then((res) => {
                // console.log(res.data);
                if (res.data.acknowledged) {
                  Swal.fire({
                    title: "Success!",
                    text: "User Registred succesfully",
                    icon: "success",
                    confirmButtonText: "Cool",
                  });
                  navigate("/auth/login");
                  Logout();
                }
              });
            // Swal.fire({
            //           title: 'Success!',
            //           text: 'User Loged in succesfully',
            //           icon: 'success',
            //           confirmButtonText: 'Cool'
            //         })
            // navigate(location?.state ? location.state : "/");
          }
        );
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // console.log(errorCode,errorMessage)
        setError(errorMessage);
        e.target.reset();
      });

    // console.log({ name, photo, email, password });
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="card rounded-none bg-base-100 w-full max-w-lg shrink-0 p-10">
        <h2 className="text-2xl font-semibold text-center">
          Register your account
        </h2>
        <form onSubmit={handleSubmit} className="card-body p-0">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              name="email"
              type="email"
              placeholder="email"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Your Name</span>
            </label>
            <input
              name="name"
              type="text"
              placeholder="Your Name"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Avater</span>
            </label>
            <input
              name="photo"
              type="text"
              placeholder="Photo URL"
              className="input input-bordered"
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Blood group</span>
            </label>
            <select
              onChange={(e) => setType(e.target.value)}
              required
              value={type}
            >
              <option disabled value="">
                Select Blood group
              </option>
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
            <label className="label">
              <span className="label-text">District</span>
            </label>
            <select
              onChange={(e) => setDistrict(e.target.value)}
              required
              value={district}
            >
              <option disabled value="">
                Select District
              </option>
              {districtreasorce.map((option) => {
                return (
                  <option key={option.id} value={option.name}>
                    {option.name}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Upazila</span>
            </label>
            <select
              onChange={(e) => setUpazila(e.target.value)}
              required
              value={upazila}
            >
              <option disabled value="">
                Select Upazila
              </option>
              {upazilareasorce.map((option) => {
                return (
                  <option key={option.id} value={option.name}>
                    {option.name}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="form-control relative">
            <label className="label">
              <span className="label-text">Password</span>
            </label>

            <input
              name="password"
              type={passtype ? "text" : "password"}
              placeholder="password"
              className="input input-bordered"
              required
            />
            <span
              onClick={() => setPasstype(!passtype)}
              className="absolute right-5 top-14 "
            >
              {passtype ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          <div className="form-control relative">
            <label className="label">
              <span className="label-text">Confirm Password</span>
            </label>

            <input
              name="Confirmpassword"
              type={passtypec ? "text" : "password"}
              placeholder="Confirm Password"
              className="input input-bordered"
              required
            />
            <span
              onClick={() => setPasstypec(!passtypec)}
              className="absolute right-5 top-14 "
            >
              {passtypec ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          <h2 className="text-red-500">{error && error}</h2>
          <div className="form-control mt-6">
            <button className="btn btn-primary btn-sm rounded-none">Register</button>
          </div>
        </form>
        <p className="text-center text-sm">
          Already Have An Account ?{" "}
          <Link className="text-red-500" to="/auth/login">
            Login
          </Link>
        </p>

        <div className="pt-2"></div>
      </div>
    </div>
  );
};

export default Register;
