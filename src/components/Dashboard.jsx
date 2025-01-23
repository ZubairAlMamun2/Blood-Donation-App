import React, { useContext } from 'react'
import { FaBook, FaCalendar, FaEnvelope, FaHome, FaList, FaSearch, FaShoppingCart, FaUsers, FaUtensils } from 'react-icons/fa';
import { Link, NavLink, Outlet } from 'react-router-dom';
import { AuthContext } from '../provider/AuthProvider';

const Dashboard = () => {
    const{userData}=useContext(AuthContext)
  return (
    <div className="flex">
            {/* dashboard side bar */}
            <div className="w-64 min-h-screen bg-slate-400">
                <ul className="menu p-4">
                    {
                        userData.role=="admin" ? <>
                            <li>
                                <Link to="/dashboard">
                                    
                                    Admin Home</Link>
                            </li>
                            <li>
                                <Link to="/dashboard/profile">
                                   
                                    Profile</Link>
                            </li>
                            <li>
                                <Link to="/dashboard/all-user">
                                   
                                    All-User</Link>
                            </li>
                            <li>
                                <Link to="/dashboard/all-blood-donation-request">
                                    
                                    All-Blood-Donation-Requests</Link>
                            </li>
                            <li>
                                <Link to="/dashboard/create-donation-request">
                                    
                                    Create-Donation-Request</Link>
                            </li>
                        </>
                            :
                            
                            userData.role=="donor" ? <>
                            <li>
                                <Link to="/dashboard">
                                    
                                    Donor Home</Link>
                            </li>
                            <li>
                                <Link to="/dashboard/profile">
                                   
                                    Profile</Link>
                            </li>
                            <li>
                                <Link to="/dashboard/my-donation-requests">
                                    
                                    My-Donation-Requests</Link>
                            </li>
                            <li>
                                <Link to="/dashboard/create-donation-request">
                                    
                                    Create-Donation-Request</Link>
                            </li>
                        </>
                            :
                            
                            <>
                                <li>
                                    <NavLink to="/dashboard/userHome">
                                        <FaHome></FaHome>
                                        Volunteer Home</NavLink>
                                </li>
                                
                                
                                
                            </>
                    }
                    {/* shared nav links */}
                    <div className="divider"></div>
                    <li>
                        <NavLink to="/">
                            <FaHome></FaHome>
                            Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/">
                            <FaSearch></FaSearch>
                            Menu</NavLink>
                    </li>
                    <li>
                        <NavLink to="/">
                            <FaEnvelope></FaEnvelope>
                            Contact</NavLink>
                    </li>
                </ul>
            </div>
            {/* dashboard content */}
            <div className="flex-1 p-8">
                <Outlet></Outlet>
            </div>
        </div>
  )
}

export default Dashboard