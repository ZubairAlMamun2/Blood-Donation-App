import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useLoaderData, useNavigate, useParams } from 'react-router-dom'
import Swal from 'sweetalert2';
import { AuthContext } from '../provider/AuthProvider';

const UpdateDonation = () => {
    const [type, setType] = useState("");
    const [district, setDistrict] = useState("");
    const [districtreasorce, setDistrictreasorce] = useState([""]);
    const [upazila, setUpazila] = useState("");
    const [upazilareasorce2, setUpazilareasorce2] = useState([""]);
    const [upazilareasorce, setUpazilareasorce] = useState([""]);
    const {user,isActive,userData} = useContext(AuthContext);
    const navigate = useNavigate();
    console.log(userData.status)
    const[donation,setDonation]=useState('')

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


    const { id } = useParams();
    console.log(id)
    useEffect(()=>{
        axios.get(`http://localhost:5000/donation/${id}`)
        .then(res=>setDonation(res.data))
       },[])
console.log(donation)

       const handleSubmit = (e) => {
        e.preventDefault();
        if(userData.status=="blocked"){
            Swal.fire({
                title: "Sorry!",
                text: "you are not a active User",
                icon: "error",
                confirmButtonText: "error",
              });
             // navigate("/dashboard");
              return;
        }
    
        const form = new FormData(e.target);
        const requesterEmail = form.get("requester-email");
        const requesterName = form.get("requester-name");
        const recipientName = form.get("recipient-name");
        const hospitalName = form.get("hospital-name");
        const address = form.get("address");
        const date = form.get("date");
        const time = form.get("time");
        const requestMessage = form.get("request-message");
        const currentDate=Date()
        const bloodGroup = type;
        const selecteddistrict = district;
        const selectedupazila = upazila;
        const donationStatus = "pending";
        
        
        const formData = {
            requesterEmail,
            requesterName,
            recipientName,
            hospitalName,
            address,
            date,
            time,
            requestMessage,
          bloodGroup,
          selecteddistrict,
          selectedupazila,
          donationStatus,
          currentDate
          
        };
        console.log(formData)
    
    
        axios
        .put(`http://localhost:5000/updatedonation/${donation?._id}`, formData, {
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
            navigate("/dashboard/my-donation-requests");
           
          }
        });
    
       
      };
  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="card rounded-none bg-base-100 w-full max-w-lg shrink-0 p-10">
        <h2 className="text-2xl font-semibold text-center">
          Update donation request
        </h2>
        <form onSubmit={handleSubmit} className="card-body p-0">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Requester Name</span>
            </label>
            <input
              name="requester-name"
              type="text"
              value={userData&&userData.name}
              placeholder="requester name"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Requester Email</span>
            </label>
            <input
              name="requester-email"
              type="email"
              value={user&&user.email}
              placeholder="requester email"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Recipient Name</span>
            </label>
            <input
              name="recipient-name"
              type="text"
              placeholder="recipient name"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Receipt District</span>
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
          <div className="form-control">
            <label className="label">
              <span className="label-text">Hospital Name</span>
            </label>
            <input
              name="hospital-name"
              type="text"
              placeholder="hospital name"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Address</span>
            </label>
            <input
              name="address"
              type="text"
              placeholder="full address line"
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
              <span className="label-text">Donation Date</span>
            </label>
            <input
              name="date"
              type="date"
              placeholder="donation Date"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Donation Time</span>
            </label>
            <input
              name="time"
              type="time"
              placeholder="donation Time"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Request Message</span>
            </label>
            <textarea name="request-message" placeholder="request message"
            type="text"
              className="input input-bordered"
              required></textarea>
            
          </div>


          
          
          
          <div className="form-control mt-6">
            <button className="btn btn-neutral rounded-none">Update</button>
          </div>
        </form>
       
      </div>
    </div>
  )
}

export default UpdateDonation