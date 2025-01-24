import React from 'react'
import Swal from 'sweetalert2';

const ContactUs = () => {

    const handleSubmit=(e)=>{
        e.preventDefault();
        Swal.fire({
            title: "Success!",
            text: "Form Submited succesfully",
            icon: "success",
            confirmButtonText: "Cool",
          });
          e.target.reset();
          
    }

  return (
    <div className='my-5 border rounded-lg p-2'>
        <div><h2 className="text-2xl font-semibold text-center mb-2">Contuct Us</h2>
                <div className='md:flex justify-evenly gap-8'>
                <div className="card bg-base-100 w-full my-2 max-w-sm shrink-0 shadow-2xl">
      <form onSubmit={handleSubmit} className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input type="text" placeholder="Your Name" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email" placeholder="Email" className="input input-bordered" required />
          
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-primary">Submit</button>
        </div>
      </form>
    </div>
                    <div className='mt-24'><h2 className='text-xl text-center font-semibold'>Our Contact Number</h2>
                    <h2 className='text-center'> +8901754168</h2></div></div></div>
    </div>
  )
}

export default ContactUs