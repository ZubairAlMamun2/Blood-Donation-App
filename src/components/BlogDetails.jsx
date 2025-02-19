import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const BlogPost = ({ htmlString }) => {
  return (
    <div className="prose max-w-full">
      <div dangerouslySetInnerHTML={{ __html: htmlString }} />
    </div>
  );
};

const BlogDetails = () => {
  const [blog, setBlog] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    axios.get(`https://blood-donation-xi-two.vercel.app/blog/${id}`)
      .then((res) => setBlog(res.data))
      .catch((error) => console.error("Error fetching blog:", error));
  }, [id]);

  if (!blog) {
    return <div className="text-center text-lg font-semibold">Loading...</div>;
  }

  return (
    <div className="w-11/12 mx-auto py-6">
      <Link to="/blogs" className="btn bg-red-600 hover:bg-red-700 text-white btn-sm mb-4">&larr; Go Back</Link>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl text-red-600 font-bold mb-4">{blog.title}</h2>
        <BlogPost htmlString={blog.content} />
      </div>
    </div>
  );
};

export default BlogDetails;
