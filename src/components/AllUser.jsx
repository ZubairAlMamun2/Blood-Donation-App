import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";

const AllUser = () => {
  const [data, setData] = useState([]);
  const [id, setId] = useState("");
  console.log(data);
  useEffect(() => {
    axios
      .get("http://localhost:5000/all-user")
      .then((res) => setData(res.data));
  }, [id]);

  const handleBlock = (id) => {
    console.log(id);
    let status = "blocked";
    const user = {
      status,
    };
    axios
      .put(`http://localhost:5000/updatestatus/${id}`, user, {
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
          setId(id + 1);
          //   navigate(location?.state ? location.state : "/assignments");
        }
      });
  };
  const handleUnBlock = (id) => {
    console.log(id);
    let status = "active";
    const user = {
      status,
    };
    axios
      .put(`http://localhost:5000/updatestatus/${id}`, user, {
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
          setId(id);
          //   navigate(location?.state ? location.state : "/assignments");
        }
      });
  };
  const makeAdmin = (id) => {
    console.log(id);
    const role = "admin";
    const user = {
      role,
    };
    axios
      .put(`http://localhost:5000/updaterole/${id}`, user, {
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
          setId(id + 2);
          //   navigate(location?.state ? location.state : "/assignments");
        }
      });
  };
  const makevolunteer = (id) => {
    console.log(id);
    const role = "volunteer";
    const user = {
      role,
    };
    axios
      .put(`http://localhost:5000/updaterole/${id}`, user, {
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
          setId(id + 1);
          //   navigate(location?.state ? location.state : "/assignments");
        }
      });
  };

  return (
    <div className="w-48">
      <table className="table">
        {/* head */}
        <thead>
          <tr className="border">
            <th>user avatar</th>
            <th>user email</th>
            <th>user name</th>
            <th>user role</th>
            <th>user status</th>
            <th>Manage Status</th>
            <th>Manage Role</th>
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
                <td>{item.role}</td>
                <td>{item.status}</td>
                <td>
                  {item.status == "active" ? (
                    <button
                      className="btn"
                      onClick={() => {
                        handleBlock(item._id);
                      }}
                    >
                      Block
                    </button>
                  ) : (
                    <button
                      className="btn"
                      onClick={() => {
                        handleUnBlock(item._id);
                      }}
                    >
                      UnBlock
                    </button>
                  )}
                </td>
                <td>
                  {item.role == "donor" ? (
                    <>
                      <button
                        className="btn"
                        onClick={() => {
                          makeAdmin(item._id);
                        }}
                      >
                        Make Admin
                      </button>
                      <br />{" "}
                      <button
                        className="btn my-2"
                        onClick={() => {
                          makevolunteer(item._id);
                        }}
                      >
                        Make volunteer
                      </button>
                    </>
                  ) : item.role == "admin" ? (
                    <></>
                  ) : (
                    <button
                      className="btn"
                      onClick={() => {
                        makeAdmin(item._id);
                      }}
                    >
                      Make Admin
                    </button>
                  )}
                </td>
                {/* <td><Link to={`/dashboard/details-donation-request/${item._id}`} >View</Link></td> */}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AllUser;
