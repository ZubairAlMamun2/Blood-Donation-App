import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <div className='min-h-screen flex flex-col justify-center items-center bg-gray-100 p-6'>
      <div className='bg-white shadow-lg rounded-lg p-10 text-center'>
        <h2 className='text-4xl font-bold text-red-600 mb-4'>404 - Page Not Found</h2>
        <p className='text-gray-600 mb-6'>Sorry, the page you are looking for does not exist.</p>
        <Link 
          className='bg-red-600 text-white py-2 px-6 rounded-lg hover:bg-red-700 transition duration-300' 
          to="/"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
