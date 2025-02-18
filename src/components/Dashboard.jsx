import React, { useContext, useState } from 'react';
import { FaBook, FaHome, FaList, FaUsers, FaUtensils } from 'react-icons/fa';
import { NavLink, Outlet } from 'react-router-dom';
import { AuthContext } from '../provider/AuthProvider';
import { Menu, X } from 'lucide-react';
import MiniNav from './MiniNav';

const Dashboard = () => {
    const { userData } = useContext(AuthContext);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

    return (
        <div className="lg:flex">
            {/* Hamburger Menu */}
            <button onClick={toggleSidebar} className="hidden p-4 text-red-600 z-50">
                {sidebarOpen ? <X size={28} /> : <Menu size={28} />}
            </button>

            {/* Sidebar */}
            <div className={`fixed hidden lg:relative lg:flex lg:w-64 bg-red-600 text-white h-screen shadow-lg transition-transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 z-40`}>  
                <ul className="menu p-4 space-y-4" onClick={() => setSidebarOpen(false)}>
                    {userData.role === "admin" && (
                        <>
                            <li><NavLink to="/dashboard/home"><FaHome /><span>Admin Home</span></NavLink></li>
                            <li><NavLink to="/dashboard/profile"><FaUsers /><span>Profile</span></NavLink></li>
                            <li><NavLink to="/dashboard/all-user"><FaUsers /><span>All Users</span></NavLink></li>
                            <li><NavLink to="/dashboard/all-blood-donation-request"><FaList /><span>All Donations</span></NavLink></li>
                            <li><NavLink to="/dashboard/content-management"><FaBook /><span>Content Management</span></NavLink></li>
                            <li><NavLink to="/dashboard/create-donation-request"><FaUtensils /><span>Create Request</span></NavLink></li>
                        </>
                    )}

                    {userData.role === "donor" && (
                        <>
                            <li><NavLink to="/dashboard/home"><FaHome /><span>Donor Home</span></NavLink></li>
                            <li><NavLink to="/dashboard/profile"><FaUsers /><span>Profile</span></NavLink></li>
                            <li><NavLink to="/dashboard/my-donation-requests"><FaList /><span>My Requests</span></NavLink></li>
                            <li><NavLink to="/dashboard/create-donation-request"><FaUtensils /><span>Create Request</span></NavLink></li>
                        </>
                    )}

                    {userData.role === "volunteer" && (
                        <>
                            <li><NavLink to="/dashboard/home"><FaHome /><span>Volunteer Home</span></NavLink></li>
                            <li><NavLink to="/dashboard/profile"><FaUsers /><span>Profile</span></NavLink></li>
                            <li><NavLink to="/dashboard/all-blood-donation-request"><FaList /><span>All Requests</span></NavLink></li>
                            <li><NavLink to="/dashboard/content-management"><FaBook /><span>Content Management</span></NavLink></li>
                            <li><NavLink to="/dashboard/create-donation-request"><FaUtensils /><span>Create Request</span></NavLink></li>
                        </>
                    )}
                    
                    <div className="divider"></div>
                    <li><NavLink to="/"><FaHome /><span>Home</span></NavLink></li>
                </ul>
            </div>

            {/* Dashboard Content */}
            <MiniNav />
            <div className="flex-1 p-2">
                
                <Outlet />
            </div>
        </div>
    );
};

export default Dashboard;
