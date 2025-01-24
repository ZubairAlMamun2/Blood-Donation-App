import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../provider/AuthProvider';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
const SearchDonor = () => {
    const [type, setType] = useState('');
  const [district, setDistrict] = useState("");
  const [districtreasorce, setDistrictreasorce] = useState([""]);
  const [upazila, setUpazila] = useState("");
  const [upazilareasorce2, setUpazilareasorce2] = useState([""]);
  const [upazilareasorce, setUpazilareasorce] = useState([""]);
  const {user,userData} = useContext(AuthContext);
  const navigate = useNavigate();
  console.log(userData.status)

  const [data,setData]=useState([]);
  const [enable,setEnable]=useState(false);
  let [Id,setId]=useState('');
  useEffect(()=>{
            axios
            .get(
              `http://localhost:5000/all-user`,
        
              { withCredentials: true }
            )
        
            .then((res) => {
                const filtredData=res.data.filter(item=>item.role=="donor"&&item.bloodGroup==type&&item.selecteddistrict==district&&item.selectedupazila==upazila)
                
              setData(filtredData);
            });
          },[Id])
          
  

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
        const bloodGroup = type;
        const selecteddistrict = district;
        const selectedupazila = upazila;

        
        const formData = {

          bloodGroup,
          selecteddistrict,
          selectedupazila,

        };
        // console.log(formData)
        setId(Id++)
       setEnable(true)
      
       
        console.log(data)
    
       
      };
  return (
    <div className="min-h-screen md:flex justify-evenly items-center">
      <div className="card rounded-none shadow-xl bg-base-100 w-full max-w-lg shrink-0 p-10">
      <Link to="/"  className="text-lg my-3 btn font-semibold text-center">
         Go Back 
        </Link>
        <h2 className="text-2xl font-semibold text-center">
          Search Donor
        </h2>
        <form onSubmit={handleSubmit} className="card-body p-0">

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


          
          <div className="form-control mt-6">
            <button className="btn btn-neutral rounded-none">Search</button>
          </div>
        </form>

        
       
      </div>
      {
            enable?<div className='my-5'>
            <h2 className='text-center font-bold'>Donor Information</h2>
            <div className="">
      <table className="table">
        {/* head */}
        <thead>
          <tr className="border">
            <th>user Photo</th>
            <th>user email</th>
            <th>user name</th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          {data?.map((item) => {
            return (
              <tr key={item._id} className="border">
                <td>
                  <img
                    className="w-8 h-8 border rounded-full"
                    src={item.photo}
                    alt=""
                  />
                </td>
                <td>{item.email}</td>
                <td>{item.name}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
            </div>:<></>
        }
      
    </div>
  )
}

export default SearchDonor