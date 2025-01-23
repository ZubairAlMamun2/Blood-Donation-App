import React, { useState, useRef, useMemo } from 'react';
import JoditEditor from 'jodit-react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Navigate, useNavigate } from 'react-router-dom';
const AddBlog = ({ placeholder }) => {
    const navigate=useNavigate()
    const editor = useRef(null);
	const [content, setContent] = useState('');

	const config = useMemo(() => ({
			readonly: false, // all options from https://xdsoft.net/jodit/docs/,
			placeholder: placeholder || 'Start typings...'
		}),
		[placeholder]
	);

    const handleSubmit = (e) => {
        e.preventDefault();
    
        const form = new FormData(e.target);
        const title = form.get("title");
        const photo = form.get("photo");
        const status="draft"
        
        
        const formData = {
            title,
            photo,
            content,
            status
        };
        console.log(formData)
    
    
        axios
        .post(
          `http://localhost:5000/addnewblog`,
          formData,
          { withCredentials: true }
        )

        .then((res) => {
          // console.log(res.data);
          if (res.data.acknowledged) {
            Swal.fire({
              title: "Success!",
              text: "Blog created succesfully",
              icon: "success",
              confirmButtonText: "Cool",
            });
            navigate("/dashboard/content-management");
           
          }
        });
    
       
      };


  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="card rounded-none bg-base-100 w-full max-w-lg shrink-0 p-10">
        <h2 className="text-2xl font-semibold text-center">
          Create Blog
        </h2>
        <form onSubmit={handleSubmit} className="card-body p-0">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Title</span>
            </label>
            <input
              name="title"
              type="text"
              placeholder="Title"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Thumbnail Image</span>
            </label>
            <input
              name="photo"
              type="text"
              placeholder="Photo URL"
              className="input input-bordered"
              required
            />
          </div>
          
          <JoditEditor
			ref={editor}
			value={content}
			config={config}
			tabIndex={1} // tabIndex of textarea
			onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
			onChange={newContent => {}}
		/>
          

          <div className="form-control mt-6">
            <button className="btn btn-neutral rounded-none">Create</button>
          </div>
        </form>
       
      </div>
    </div>
  )
}

export default AddBlog