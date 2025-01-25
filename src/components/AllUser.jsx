import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import Swal from "sweetalert2";
import UseAxiosSecure from "./UseAxiosSecure";

const AllUser = () => {
    const axiossecure = UseAxiosSecure();
  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:5000/all-user");
      return res.data;
    },
  });

  const [filter, setFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1); // Current page state
  const rowsPerPage = 5; // Number of rows per page

  // Handle dropdown change
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
    setCurrentPage(1); // Reset to the first page when filter changes
  };

  // Filter users based on the selected filter
  const filteredUsers = users.filter((user) => {
    if (filter === "all") return true;
    return user.status === filter;
  });

  // Calculate the total number of pages
  const totalPages = Math.ceil(filteredUsers.length / rowsPerPage);

  // Determine the users to display on the current page
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstRow, indexOfLastRow);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleBlock = (id) => {
    const user = { status: "blocked" };
    axios.put(`http://localhost:5000/updatestatus/${id}`, user).then((res) => {
      if (res.data.modifiedCount > 0) {
        Swal.fire("Success!", "User Updated successfully", "success");
        refetch();
      }
    });
  };

  const handleUnBlock = (id) => {
    const user = { status: "active" };
    axios.put(`http://localhost:5000/updatestatus/${id}`, user).then((res) => {
      if (res.data.modifiedCount > 0) {
        Swal.fire("Success!", "User Updated successfully", "success");
        refetch();
      }
    });
  };

  const makeAdmin = (id) => {
    const user = { role: "admin" };
    axios.put(`http://localhost:5000/updaterole/${id}`, user).then((res) => {
      if (res.data.modifiedCount > 0) {
        Swal.fire("Success!", "User Updated successfully", "success");
        refetch();
      }
    });
  };

  const makeVolunteer = (id) => {
    const user = { role: "volunteer" };
    axios.put(`http://localhost:5000/updaterole/${id}`, user).then((res) => {
      if (res.data.modifiedCount > 0) {
        Swal.fire("Success!", "User Updated successfully", "success");
        refetch();
      }
    });
  };

  return (
    <div className="w-48">
      <div className="flex justify-start items-center gap-2 py-2">
        <h1>User List: </h1>
        <select
          value={filter}
          onChange={handleFilterChange}
          className="p-2 border rounded mb-4"
        >
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="blocked">Blocked</option>
        </select>
      </div>
      <table className="table">
        <thead>
          <tr className="border">
            <th>User Avatar</th>
            <th>User Email</th>
            <th>User Name</th>
            <th>User Role</th>
            <th>User Status</th>
            <th>Manage Status</th>
            <th>Manage Role</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.length > 0 ? (
            currentUsers.map((item) => (
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
                  {item.status === "active" ? (
                    <button
                      className="btn"
                      onClick={() => handleBlock(item._id)}
                    >
                      Block
                    </button>
                  ) : (
                    <button
                      className="btn"
                      onClick={() => handleUnBlock(item._id)}
                    >
                      Unblock
                    </button>
                  )}
                </td>
                <td>
                  {item.role === "donor" ? (
                    <>
                      <button
                        className="btn"
                        onClick={() => makeAdmin(item._id)}
                      >
                        Make Admin
                      </button>
                      <button
                        className="btn my-2"
                        onClick={() => makeVolunteer(item._id)}
                      >
                        Make Volunteer
                      </button>
                    </>
                  ) : null}
                </td>
              </tr>
            ))
          ) : (
            <p>No users found for the selected filter.</p>
          )}
        </tbody>
      </table>
      <div className="flex justify-center mt-4">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`px-4 py-2 mx-1 rounded ${
              currentPage === index + 1
                ? "bg-blue-500 text-white"
                : "bg-gray-300"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AllUser;
