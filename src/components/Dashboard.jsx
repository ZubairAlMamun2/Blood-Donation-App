import React from 'react'
import { FaBook, FaCalendar, FaEnvelope, FaHome, FaList, FaSearch, FaShoppingCart, FaUsers, FaUtensils } from 'react-icons/fa';
import { Link, NavLink, Outlet } from 'react-router-dom';

const Dashboard = () => {
    const isAdmin=false;
    const isDonor=true;
  return (
    <div className="flex">
            {/* dashboard side bar */}
            <div className="w-64 min-h-screen bg-slate-400">
                <ul className="menu p-4">
                    {
                        isAdmin ? <>
                            <li>
                                <NavLink to="/dashboard/adminHome">
                                    <FaHome></FaHome>
                                    Admin Home</NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/addItems">
                                    <FaUtensils></FaUtensils>
                                    Add Items</NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/manageItems">
                                    <FaList></FaList>
                                    Manage Items</NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/bookings">
                                    <FaBook></FaBook>
                                    Manage Bookings</NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/users">
                                    <FaUsers></FaUsers>
                                    All Users</NavLink>
                            </li>
                        </>
                            :
                            
                            isDonor ? <>
                            <li>
                                <Link to="/dashboard">
                                    <FaHome></FaHome>
                                    Donor Home</Link>
                            </li>
                            <li>
                                <Link to="/dashboard/profile">
                                    <FaUtensils></FaUtensils>
                                    Profile</Link>
                            </li>
                            <li>
                                <Link to="/dashboard/my-donation-requests">
                                    <FaList></FaList>
                                    My-Donation-Requests</Link>
                            </li>
                            <li>
                                <Link to="/dashboard/create-donation-request">
                                    <FaBook></FaBook>
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
                                <li>
                                    <NavLink to="/dashboard/history">
                                        <FaCalendar></FaCalendar>
                                        Not History</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/cart">
                                        <FaShoppingCart></FaShoppingCart>
                                        My Cart ({cart.length})</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/review">
                                        <FaAd></FaAd>
                                        Add a Review</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/paymentHistory">
                                        <FaList></FaList>
                                        Real Payment History</NavLink>
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