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
    <div className=" p-6 bg-white shadow-lg rounded-lg min-h-screen">
      <div className="flex justify-between items-center py-4 mb-6 flex-wrap">
        <h1 className="text-2xl font-semibold text-red-600">User List</h1>
        <select
          value={filter}
          onChange={handleFilterChange}
          className="p-2 border rounded-md text-sm focus:ring-2 focus:ring-red-600 mt-4 sm:mt-0"
        >
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="blocked">Blocked</option>
        </select>
      </div>

      <table className="table-auto border-collapse mb-6">
        <thead>
          <tr className="bg-red-600 text-white">
            <th className="py-2 px-4 text-left">User Avatar</th>
            <th className="py-2 px-4 text-left">User Email</th>
            <th className="py-2 px-4 text-left">User Name</th>
            <th className="py-2 px-4 text-left">User Role</th>
            <th className="py-2 px-4 text-left">User Status</th>
            <th className="py-2 px-4 text-left">Manage Status</th>
            <th className="py-2 px-4 text-left">Manage Role</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.length > 0 ? (
            currentUsers.map((item) => (
              <tr key={item._id} className="border-b">
                <td className="py-2 px-4">
                  <img
                    className="w-10 h-10 border rounded-full"
                    src={item.photo}
                    alt="User Avatar"
                  />
                </td>
                <td className="py-2 px-4">{item.email}</td>
                <td className="py-2 px-4">{item.name}</td>
                <td className="py-2 px-4">{item.role}</td>
                <td className="py-2 px-4">{item.status}</td>
                <td className="py-2 px-4">
                  {item.status === "active" ? (
                    <button
                      className="bg-red-600 text-white py-1 px-4 rounded-md hover:bg-red-700"
                      onClick={() => handleBlock(item._id)}
                    >
                      Block
                    </button>
                  ) : (
                    <button
                      className="bg-green-600 text-white py-1 px-4 rounded-md hover:bg-green-700"
                      onClick={() => handleUnBlock(item._id)}
                    >
                      Unblock
                    </button>
                  )}
                </td>
                <td className="py-2 px-4">
                  {item.role === "donor" ? (
                    <>
                      <button
                        className="bg-green-600 text-white py-1 px-4 rounded-md hover:bg-green-700"
                        onClick={() => makeAdmin(item._id)}
                      >
                        Make Admin
                      </button>
                      <button
                        className="bg-green-600 mt-1 text-white py-1 px-1 rounded-md hover:bg-green-700"
                        onClick={() => makeVolunteer(item._id)}
                      >
                        Make Volunteer
                      </button>
                    </>
                  ) : item.role === "volunteer" ? (
                    <button
                      className="bg-green-600 text-white py-1 px-4 rounded-md hover:bg-green-700"
                      onClick={() => makeAdmin(item._id)}
                    >
                      Make Admin
                    </button>
                  ) : null}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center py-4 text-red-500">
                No users found for the selected filter.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-center mt-6">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`px-4 py-2 mx-1 rounded-md ${
              currentPage === index + 1
                ? "bg-red-600 text-white"
                : "bg-gray-300 text-black"
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
