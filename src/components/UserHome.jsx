import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import axios from "axios";
import { Link, useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";
import { CiSquareQuestion } from "react-icons/ci";
import { FaUsers } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import { RiMoneyDollarCircleFill } from "react-icons/ri";

const UserHome = () => {
    const [countuser, setcountuser] = useState([]);
    const { user, userData } = useContext(AuthContext);
    const [donations, setDoations] = useState([]);
    const [filtreddonations, setfiltredDoations] = useState([]);
    const { data: funds = [], refetch3 } = useQuery({
        queryKey: ["funds"],
        queryFn: async () => {
            const res = await axios.get("http://localhost:5000/totalfunds");
            return res.data;
        },
    });

    const totalAmount = funds.reduce((sum, item) => sum + parseFloat(item.amount), 0);

    const { data: loadeddonations = [], refetch } = useQuery({
        queryKey: ['loadeddonations'],
        queryFn: async () => {
            const res = await axios.get('http://localhost:5000/mydonation');
            return res.data;
        },
    });

    const { data: donor = [], refetch2 } = useQuery({
        queryKey: ['donor'],
        queryFn: async () => {
            const res = await axios.get('http://localhost:5000/all-user');
            return res.data;
        },
    });

    useEffect(() => {
        const filtreddata = loadeddonations.filter(
            (item) => item.requesterEmail == user?.email
        );
        setDoations(filtreddata);
        const filteredDonations = filtreddata
            .sort((a, b) => {
                return new Date(b.currentDate) - new Date(a.currentDate);
            })
            .slice(0, 3);
        setfiltredDoations(filteredDonations);
    }, [user]);

    const handleDelete = (_id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:5000/deleterequest/${_id}`, {
                    method: "DELETE",
                })
                    .then((res) => res.json())
                    .then((res) => {
                        if (res.deletedCount > 0) {
                            Swal.fire({
                                title: "Success!",
                                text: "Donation Request Deleted successfully",
                                icon: "success",
                                confirmButtonText: "Cool",
                            });
                            const filtereddata = donations.filter((user) => user._id !== _id);
                            setDoations(filtereddata);
                        }
                    });
            }
        });
    };

    return (
        <div className="p-5 bg-gray-100 min-h-screen">
            <div className="my-5">
                <h2 className="text-3xl text-red-600">
                    <span>Welcome </span>
                    {userData?.name}
                </h2>
            </div>
            {
                (userData.role === "admin" || userData.role === "volunteer") &&
                <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
                    <div className="card border-red-400 border-4 shadow-xl p-6 my-5 grid grid-cols-3 bg-red-100">
                        <div className="col-span-1 flex items-center justify-center text-5xl font-bold text-red-600"><CiSquareQuestion /></div>
                        <div className="col-span-2 text-red-600">
                            <h2 className="font-semibold">Total Blood Donation Request</h2>
                            <p className="text-3xl font-bold">{loadeddonations.length}</p>
                        </div>
                    </div>
                    <div className="card border-red-400 border-4 shadow-xl p-6 my-5 grid grid-cols-3 bg-red-100">
                        <div className="col-span-1 flex items-center justify-center text-5xl font-bold text-red-600"><FaUsers /></div>
                        <div className="col-span-2 text-red-600">
                            <h2 className="font-semibold">Total Donors</h2>
                            <p className="text-3xl font-bold">{countuser.length}</p>
                        </div>
                    </div>
                    <div className="card border-red-400 border-4 shadow-xl p-6 my-5 grid grid-cols-3 bg-red-100">
                        <div className="col-span-1 flex items-center justify-center text-5xl font-bold text-red-600"><RiMoneyDollarCircleFill /></div>
                        <div className="col-span-2 text-red-600">
                            <h2 className="font-semibold">Total Amount</h2>
                            <p className="text-3xl font-bold">{totalAmount}</p>
                        </div>
                    </div>
                </div>
            }

            {
                (filtreddonations.length > 0 && userData.role === "donor") &&
                <div className="w-full overflow-x-auto bg-white p-6 rounded-lg shadow-lg">
                    <table className="table text-gray-800">
                        <thead>
                            <tr className="border-b-2">
                                <th>Recipient Name</th>
                                <th>Location</th>
                                <th>Date</th>
                                <th>Time</th>
                                <th>Blood Group</th>
                                <th>Status</th>
                                <th>Donor Info</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtreddonations.map((item) => (
                                <tr key={item._id} className="border-b">
                                    <td>{item.recipientName}</td>
                                    <td>{item.selecteddistrict}, {item.selectedupazila}</td>
                                    <td>{item.date}</td>
                                    <td>{item.time}</td>
                                    <td>{item.bloodGroup}</td>
                                    <td>{item.donationStatus}</td>
                                    <td>
                                        <Link to={`/dashboard/update-donation-request/${item._id}`} className="btn btn-sm bg-red-500 text-white hover:bg-red-600">
                                            Edit
                                        </Link>
                                    </td>
                                    <td>
                                        <button onClick={() => handleDelete(item._id)} className="btn btn-sm bg-red-500 text-white hover:bg-red-600">
                                            Delete
                                        </button>
                                    </td>
                                    <td>
                                        <Link to={`/dashboard/details-donation-request/${item._id}`} className="btn btn-sm bg-blue-500 text-white hover:bg-blue-600">
                                            View
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            }

            {
                (userData.role === "donor") &&
                <div className="my-5">
                    <Link className="btn bg-blue-600 text-white hover:bg-blue-700 btn-sm" to="/dashboard/my-donation-requests">
                        View All My Requests
                    </Link>
                </div>
            }
        </div>
    );
};

export default UserHome;
