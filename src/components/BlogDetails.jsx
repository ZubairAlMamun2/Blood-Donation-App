import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
const BlogPost = ({ htmlString }) => {
    return (
      <div>
        <div dangerouslySetInnerHTML={{ __html: htmlString }} />
      </div>
    );
  };
const BlogDetails = () => {
    const [blog ,setBlog]=useState([])
    const { id } = useParams();
    // /blog/:id
    useEffect(() => {
        axios
          .get(`http://localhost:5000/blog/${id}`)
          .then((res) => setBlog(res.data));
      }, []);
  return (
    <div className='w-11/12 mx-auto'>
        <Link to="/blogs"  className="text-lg my-3 btn btn-primary btn-sm font-semibold text-center">
         Go Back 
        </Link>
        <h2 className='mb-5'>{blog?.title}</h2>
        <h2><BlogPost htmlString={blog?.content} /></h2>
        
    </div>
  )
}

export default BlogDetails