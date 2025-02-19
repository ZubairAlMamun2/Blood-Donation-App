import React from "react";
import axios from "axios";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

const BlogPost = ({ htmlString }) => {
  return <div dangerouslySetInnerHTML={{ __html: htmlString }} />;
};

const Blogs = () => {
  // Fetch blogs using react-query
  const { data: blogs = [], isLoading, error } = useQuery({
    queryKey: ["blogs"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:5000/all-blog");
      return res.data.filter((blog) => blog.status === "published");
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-red-500 border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-600 text-lg">Error fetching blogs.</div>;
  }

  return (
    <div className="bg-gray-100 ">
      <NavBar />
      <main className="container mx-auto px-4 py-8 mt-20 min-h-screen">
        <h2 className="text-3xl font-bold text-red-600 text-center mb-8">Our Latest Blogs</h2>

        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {blogs.map((item) => (
            <div key={item._id} className="bg-white shadow-md rounded-lg overflow-hidden border">
              <div className="p-5">
                <h2 className="text-xl font-semibold text-gray-800">{item.title}</h2>
                <div className="text-sm text-gray-600 mt-2">
                  <BlogPost htmlString={item.content.slice(0, 250)} />
                  ...
                </div>
                <div className="flex justify-end mt-4">
                  <Link
                    to={`/blogdetails/${item._id}`}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm transition"
                  >
                    Read More
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Blogs;
