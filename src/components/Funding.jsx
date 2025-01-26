import React from 'react'
import NavBar from './NavBar'
import Footer from './Footer'
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const Funding = () => {
    const { data: funds = [], refetch } = useQuery({
        queryKey: ["funds"],
        queryFn: async () => {
          const res = await axios.get("https://blood-donation-xi-two.vercel.app/totalfunds");
          return res.data;
        },
      });
      console.log(funds)
  return (
    <div className='w-11/12 mx-auto'>
        <header>
            <NavBar />
        </header>
        <main className='min-h-[60vh]'>
            <button className='btn btn-primary btn-sm'>Pay</button>
            <table className="table mt-5">
          {/* Head */}
          <thead>
            <tr className="border">
              <th>Name</th>
              <th>Amount</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {
              funds.map((item) => (
                <tr key={item._id} className="border">
                  <td>{item.name}</td>
                  <td>
                    {item.amount}
                  </td>
                  <td>{item.date}</td>
                </tr>
              ))
            }
          </tbody>
        </table>
            
            
        </main>
        <Footer />
    </div>
  )
}

export default Funding