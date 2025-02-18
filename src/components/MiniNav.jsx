import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import { Menu, X } from "lucide-react"; // Icons
import { FaBook, FaHome, FaList, FaUsers, FaUtensils } from "react-icons/fa";

const MiniNav = () => {
  const { userData } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  // Function to close sidebar on route click
  const closeSidebar = () => setIsOpen(false);

  return (
    <nav className="bg-red-600 text-white lg:hidden py-4 shadow-lg relative">
      <div className="flex justify-between items-center container mx-auto px-4">
        {/* Hamburger Icon */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="focus:outline-none"
          aria-label="Toggle sidebar"
        >
          <Menu className="w-8 h-8" />
        </button>

        <h3 className="text-white text-3xl font-bold">RedHope</h3>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 text-white bg-red-600 shadow-lg transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out z-50`}
      >
        {/* Close Button */}
        <button
          onClick={closeSidebar}
          className="absolute top-4 right-4 focus:outline-none"
        >
          
        </button>

        <ul className="menu p-6 space-y-4">
          {userData.role === "admin" && (
            <>
              <li>
                <NavLink to="/dashboard/home" onClick={closeSidebar}>
                  <FaHome /> <span>Admin Home</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/profile" onClick={closeSidebar}>
                  <FaUsers /> <span>Profile</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/all-user" onClick={closeSidebar}>
                  <FaUsers /> <span>All Users</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/all-blood-donation-request"
                  onClick={closeSidebar}
                >
                  <FaList /> <span>All Donations</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/content-management" onClick={closeSidebar}>
                  <FaBook /> <span>Content Management</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/create-donation-request" onClick={closeSidebar}>
                  <FaUtensils /> <span>Create Request</span>
                </NavLink>
              </li>
            </>
          )}

          {userData.role === "donor" && (
            <>
              <li>
                <NavLink to="/dashboard/home" onClick={closeSidebar}>
                  <FaHome /> <span>Donor Home</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/profile" onClick={closeSidebar}>
                  <FaUsers /> <span>Profile</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/my-donation-requests" onClick={closeSidebar}>
                  <FaList /> <span>My Requests</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/create-donation-request" onClick={closeSidebar}>
                  <FaUtensils /> <span>Create Request</span>
                </NavLink>
              </li>
            </>
          )}

          {userData.role === "volunteer" && (
            <>
              <li>
                <NavLink to="/dashboard/home" onClick={closeSidebar}>
                  <FaHome /> <span>Volunteer Home</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/profile" onClick={closeSidebar}>
                  <FaUsers /> <span>Profile</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/all-blood-donation-request" onClick={closeSidebar}>
                  <FaList /> <span>All Requests</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/content-management" onClick={closeSidebar}>
                  <FaBook /> <span>Content Management</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/create-donation-request" onClick={closeSidebar}>
                  <FaUtensils /> <span>Create Request</span>
                </NavLink>
              </li>
            </>
          )}

          <div className="divider"></div>
          <li>
            <NavLink to="/" onClick={closeSidebar}>
              <FaHome /> <span>Home</span>
            </NavLink>
          </li>
        </ul>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40"
          onClick={closeSidebar}
        ></div>
      )}
    </nav>
  );
};

export default MiniNav;
