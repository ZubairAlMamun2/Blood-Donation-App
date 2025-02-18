import React from "react";
import axios from "axios";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

const BlogPost = ({ htmlString }) => {
  return (
    <div>
      <div dangerouslySetInnerHTML={{ __html: htmlString }} />
    </div>
  );
};

const Blogs = () => {
  // Fetch blogs using react-query
  const { data: blogs = [], isLoading, error } = useQuery({
    queryKey: ["blogs"],
    queryFn: async () => {
      const res = await axios.get("https://blood-donation-xi-two.vercel.app/all-blog");
      return res.data.filter((blog) => blog.status === "published");
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching blogs.</div>;
  }

  return (
    <div className="">
      <header>
        <NavBar />
      </header>
      <main className="min-h-[60vh] py-4">
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {blogs.map((item) => (
            <div
              key={item._id}
              className="card shadow-xl rounded-lg overflow-hidden border"
            >
              <div className="card-body p-4">
                <h2 className="card-title text-lg font-semibold">
                  {item.title}
                </h2>
                <div className="text-sm text-gray-600">
                  <BlogPost htmlString={item.content.slice(0, 100)} />
                  ...
                </div>
                <div className="flex justify-end mt-4">
                  <Link
                    to={`/blogdetails/${item._id}`}
                    className="btn btn-sm btn-primary"
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
