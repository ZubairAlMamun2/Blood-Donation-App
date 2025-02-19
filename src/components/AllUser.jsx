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
      const res = await axios.get("https://blood-donation-xi-two.vercel.app/all-user");
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
    axios.put(`https://blood-donation-xi-two.vercel.app/updatestatus/${id}`, user).then((res) => {
      if (res.data.modifiedCount > 0) {
        Swal.fire("Success!", "User Updated successfully", "success");
        refetch();
      }
    });
  };

  const handleUnBlock = (id) => {
    const user = { status: "active" };
    axios.put(`https://blood-donation-xi-two.vercel.app/updatestatus/${id}`, user).then((res) => {
      if (res.data.modifiedCount > 0) {
        Swal.fire("Success!", "User Updated successfully", "success");
        refetch();
      }
    });
  };

  const makeAdmin = (id) => {
    const user = { role: "admin" };
    axios.put(`https://blood-donation-xi-two.vercel.app/updaterole/${id}`, user).then((res) => {
      if (res.data.modifiedCount > 0) {
        Swal.fire("Success!", "User Updated successfully", "success");
        refetch();
      }
    });
  };

  const makeVolunteer = (id) => {
    const user = { role: "volunteer" };
    axios.put(`https://blood-donation-xi-two.vercel.app/updaterole/${id}`, user).then((res) => {
      if (res.data.modifiedCount > 0) {
        Swal.fire("Success!", "User Updated successfully", "success");
        refetch();
      }
    });
  };

  return (
    <div className=" p-2 bg-white shadow-lg rounded-lg min-h-screen">
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

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300">
          <thead className="bg-red-600 text-white">
            <tr>
              <th className="p-2">User Avatar</th>
              <th className="p-2">User Email</th>
              <th className="p-2">User Name</th>
              <th className="p-2">User Role</th>
              <th className="p-2">User Status</th>
              <th className="p-2">Manage Status</th>
              <th className="p-2">Manage Role</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.length > 0 ? (
              currentUsers.map((item) => (
                <tr key={item._id} className="border text-center">
                  <td className="p-2">
                    <img
                      className="w-10 h-10 border rounded-full mx-auto"
                      src={item.photo}
                      alt="User Avatar"
                    />
                  </td>
                  <td className="p-2">{item.email}</td>
                  <td className="p-2">{item.name}</td>
                  <td className="p-2 font-bold">{item.role}</td>
                  <td className="p-2">
                    <span
                      className={`px-2 py-1 rounded-md text-black ${
                        item.status === "active" ? "bg-green-100" : "bg-red-100"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="p-2">
                    {item.status === "active" ? (
                      <button
                        className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700 transition"
                        onClick={() => handleBlock(item._id)}
                      >
                        Block
                      </button>
                    ) : (
                      <button
                        className="bg-green-600 text-white px-3 py-1 rounded-md hover:bg-green-700 transition"
                        onClick={() => handleUnBlock(item._id)}
                      >
                        Unblock
                      </button>
                    )}
                  </td>
                  <td className="p-2 flex justify-center space-x-2">
                    {item.role === "donor" ? (
                      <>
                        <button
                          className="bg-green-600 text-white px-3 py-1 rounded-md hover:bg-green-700 transition"
                          onClick={() => makeAdmin(item._id)}
                        >
                          Make Admin
                        </button>
                        <button
                          className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 transition"
                          onClick={() => makeVolunteer(item._id)}
                        >
                          Make Volunteer
                        </button>
                      </>
                    ) : item.role === "volunteer" ? (
                      <button
                        className="bg-green-600 text-white px-3 py-1 rounded-md hover:bg-green-700 transition"
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
      </div>

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
