import React from 'react';
import NavBar from './NavBar';
import Footer from './Footer';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const Funding = () => {
    const { data: funds = [], isLoading } = useQuery({
        queryKey: ["funds"],
        queryFn: async () => {
            const res = await axios.get("http://localhost:5000/totalfunds");
            return res.data;
        },
    });

    return (
        <div className="dark:bg-slate-400 min-h-screen">
            <NavBar />
            <div className="container mx-auto mt-20 px-4 py-6 min-h-screen">
                <h2 className="text-center text-3xl font-bold text-red-600 mb-6">Funding Details</h2>

                {/* Spinner (Loading) */}
                {isLoading ? (
                    <div className="flex justify-center items-center h-40">
                        <div className="animate-spin rounded-full h-16 w-16 border-4 border-red-500 border-t-transparent"></div>
                    </div>
                ) : (
                    <div className="overflow-x-auto bg-white shadow-md rounded-lg p-4">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-semibold text-gray-700">Total Funding</h3>
                            <button className="bg-red-600 hidden hover:bg-red-700 text-white px-5 py-2 rounded-md text-sm transition">
                                Pay
                            </button>
                        </div>

                        <table className="w-full border-collapse">
                            {/* Table Head */}
                            <thead>
                                <tr className="bg-red-600 text-white text-lg">
                                    <th className="py-3 px-4 text-left">Name</th>
                                    <th className="py-3 px-4 text-left">Amount</th>
                                    <th className="py-3 px-4 text-left">Date</th>
                                </tr>
                            </thead>

                            {/* Table Body */}
                            <tbody>
                                {funds.length > 0 ? (
                                    funds.map((item) => (
                                        <tr key={item._id} className="border-b hover:bg-gray-100">
                                            <td className="py-3 px-4">{item.name}</td>
                                            <td className="py-3 px-4 font-bold text-red-600">${item.amount}</td>
                                            <td className="py-3 px-4">{item.date}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="3" className="text-center py-6 text-gray-500">
                                            No funding data available.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default Funding;
