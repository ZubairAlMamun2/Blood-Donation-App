import React, { useContext, useState } from 'react';
import { FaBook, FaCalendar, FaEnvelope, FaHome, FaList, FaSearch, FaShoppingCart, FaUsers, FaUtensils } from 'react-icons/fa';
import { Link, NavLink, Outlet } from 'react-router-dom';
import { AuthContext } from '../provider/AuthProvider';
import { Menu, X } from "lucide-react";

const Dashboard = () => {
    const { userData } = useContext(AuthContext);

    return (
        <div className="flex">
            {/* Dashboard Sidebar */}
            <div className="w-28 hidden md:flex lg:w-64 md:w-48 min-h-screen bg-red-600 text-white shadow-lg">
                <ul className="menu  p-4 space-y-4">
                    {userData.role === "admin" ? (
                        <>
                            <li>
                                <NavLink 
                                  to="/dashboard/home"
                                  className={({ isActive }) => 
                                    isActive ? "bg-red-700 hover:bg-red-800 px-3 py-2 rounded-md flex items-center space-x-2" : "hover:bg-red-700 px-3 py-2 rounded-md flex items-center space-x-2"
                                  }
                                >
                                    <FaHome />
                                    <span>Admin Home</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink 
                                  to="/dashboard/profile"
                                  className={({ isActive }) => 
                                    isActive ? "bg-red-700 hover:bg-red-800 px-3 py-2 rounded-md flex items-center space-x-2" : "hover:bg-red-700 px-3 py-2 rounded-md flex items-center space-x-2"
                                  }
                                >
                                    <FaUsers />
                                    <span>Profile</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink 
                                  to="/dashboard/all-user"
                                  className={({ isActive }) => 
                                    isActive ? "bg-red-700 hover:bg-red-800 px-3 py-2 rounded-md flex items-center space-x-2" : "hover:bg-red-700 px-3 py-2 rounded-md flex items-center space-x-2"
                                  }
                                >
                                    <FaUsers />
                                    <span>All Users</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink 
                                  to="/dashboard/all-blood-donation-request"
                                  className={({ isActive }) => 
                                    isActive ? "bg-red-700 hover:bg-red-800 px-3 py-2 rounded-md flex items-center space-x-2" : "hover:bg-red-700 px-3 py-2 rounded-md flex items-center space-x-2"
                                  }
                                >
                                    <FaList />
                                    <span>All Blood Donations</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink 
                                  to="/dashboard/content-management"
                                  className={({ isActive }) => 
                                    isActive ? "bg-red-700 hover:bg-red-800 px-3 py-2 rounded-md flex items-center space-x-2" : "hover:bg-red-700 px-3 py-2 rounded-md flex items-center space-x-2"
                                  }
                                >
                                    <FaBook />
                                    <span>Content Management</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink 
                                  to="/dashboard/create-donation-request"
                                  className={({ isActive }) => 
                                    isActive ? "bg-red-700 hover:bg-red-800 px-3 py-2 rounded-md flex items-center space-x-2" : "hover:bg-red-700 px-3 py-2 rounded-md flex items-center space-x-2"
                                  }
                                >
                                    <FaUtensils />
                                    <span>Create Donation Request</span>
                                </NavLink>
                            </li>
                        </>
                    ) : userData.role === "donor" ? (
                        <>
                            <li>
                                <NavLink 
                                  to="/dashboard/home"
                                  className={({ isActive }) => 
                                    isActive ? "bg-red-700 hover:bg-red-800 px-3 py-2 rounded-md flex items-center space-x-2" : "hover:bg-red-700 px-3 py-2 rounded-md flex items-center space-x-2"
                                  }
                                >
                                    <FaHome />
                                    <span>Donor Home</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink 
                                  to="/dashboard/profile"
                                  className={({ isActive }) => 
                                    isActive ? "bg-red-700 hover:bg-red-800 px-3 py-2 rounded-md flex items-center space-x-2" : "hover:bg-red-700 px-3 py-2 rounded-md flex items-center space-x-2"
                                  }
                                >
                                    <FaUsers />
                                    <span>Profile</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink 
                                  to="/dashboard/my-donation-requests"
                                  className={({ isActive }) => 
                                    isActive ? "bg-red-700 hover:bg-red-800 px-3 py-2 rounded-md flex items-center space-x-2" : "hover:bg-red-700 px-3 py-2 rounded-md flex items-center space-x-2"
                                  }
                                >
                                    <FaList />
                                    <span>My Donation Requests</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink 
                                  to="/dashboard/create-donation-request"
                                  className={({ isActive }) => 
                                    isActive ? "bg-red-700 hover:bg-red-800 px-3 py-2 rounded-md flex items-center space-x-2" : "hover:bg-red-700 px-3 py-2 rounded-md flex items-center space-x-2"
                                  }
                                >
                                    <FaUtensils />
                                    <span>Create Donation Request</span>
                                </NavLink>
                            </li>
                        </>
                    ) : (
                        <>
                            <li>
                                <NavLink 
                                  to="/dashboard/home"
                                  className={({ isActive }) => 
                                    isActive ? "bg-red-700 hover:bg-red-800 px-3 py-2 rounded-md flex items-center space-x-2" : "hover:bg-red-700 px-3 py-2 rounded-md flex items-center space-x-2"
                                  }
                                >
                                    <FaHome />
                                    <span>Volunteer Home</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink 
                                  to="/dashboard/profile"
                                  className={({ isActive }) => 
                                    isActive ? "bg-red-700 hover:bg-red-800 px-3 py-2 rounded-md flex items-center space-x-2" : "hover:bg-red-700 px-3 py-2 rounded-md flex items-center space-x-2"
                                  }
                                >
                                    <FaUsers />
                                    <span>Profile</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink 
                                  to="/dashboard/all-blood-donation-request"
                                  className={({ isActive }) => 
                                    isActive ? "bg-red-700 hover:bg-red-800 px-3 py-2 rounded-md flex items-center space-x-2" : "hover:bg-red-700 px-3 py-2 rounded-md flex items-center space-x-2"
                                  }
                                >
                                    <FaList />
                                    <span>All Blood Donation Requests</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink 
                                  to="/dashboard/content-management"
                                  className={({ isActive }) => 
                                    isActive ? "bg-red-700 hover:bg-red-800 px-3 py-2 rounded-md flex items-center space-x-2" : "hover:bg-red-700 px-3 py-2 rounded-md flex items-center space-x-2"
                                  }
                                >
                                    <FaBook />
                                    <span>Content Management</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink 
                                  to="/dashboard/create-donation-request"
                                  className={({ isActive }) => 
                                    isActive ? "bg-red-700 hover:bg-red-800 px-3 py-2 rounded-md flex items-center space-x-2" : "hover:bg-red-700 px-3 py-2 rounded-md flex items-center space-x-2"
                                  }
                                >
                                    <FaUtensils />
                                    <span>Create Donation Request</span>
                                </NavLink>
                            </li>
                        </>
                    )}

                    {/* Shared nav links */}
                    <div className="divider"></div>
                    <li>
                        <NavLink 
                          to="/" 
                          className={({ isActive }) => 
                            isActive ? "bg-red-700 hover:bg-red-800 px-3 py-2 rounded-md flex items-center space-x-2" : "hover:bg-red-700 px-3 py-2 rounded-md flex items-center space-x-2"
                          }
                        >
                            <FaHome />
                            <span>Home</span>
                        </NavLink>
                    </li>
                </ul>
            </div>
            

            {/* Dashboard Content */}
            <div className="flex-1 p-6 md:p-8">
                <Outlet />
            </div>
        </div>
    );
};

export default Dashboard;
