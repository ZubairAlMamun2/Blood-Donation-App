import React from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

const BlogPost = ({ htmlString }) => {
  return <div dangerouslySetInnerHTML={{ __html: htmlString }} />;
};

const BlogSection = () => {
  // Fetch latest blogs
  const { data: blogs = [], isLoading, error } = useQuery({
    queryKey: ["blogs"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:5000/all-blog");
      return res.data
        .filter((blog) => blog.status === "published")
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // Sort by newest first
        .slice(0, 3); // Limit to 3 blogs
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-red-500 border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-600 text-lg">Error loading blogs.</div>;
  }

  return (
    <section className="bg-white py-12">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <h2 className="text-3xl font-bold text-red-600 text-center mb-8">
          Latest Blogs
        </h2>

        {/* Blog Grid */}
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {blogs.map((item) => (
            <div key={item._id} className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-200 transition hover:shadow-xl">
              <div className="p-5">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600 mb-4">
                  <BlogPost htmlString={item.content.slice(0, 150)} />...
                </p>
                <div className="flex justify-end">
                  <Link
                    to={`/blogdetails/${item._id}`}
                    className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white font-medium rounded-md transition"
                  >
                    Read More
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Blogs Button */}
        <div className="text-center mt-8">
          <Link
            to="/blogs"
            className="px-6 py-3 bg-green-600 text-white  rounded-md hover:bg-green-700 transition"
          >
            View All Blogs
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
