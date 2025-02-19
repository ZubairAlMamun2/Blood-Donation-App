import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import axios from "axios";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";

const BlogPost = ({ htmlString }) => {
  return <div dangerouslySetInnerHTML={{ __html: htmlString }} />;
};

const ContentManagement = () => {
  const { userData } = useContext(AuthContext);
  const { data: blogs = [], refetch } = useQuery({
    queryKey: ["blogs"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:5000/all-blog");
      return res.data;
    },
  });

  const [filter, setFilter] = useState("all");

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const filteredBlogs = blogs.filter((blog) =>
    filter === "all" ? true : blog.status === filter
  );

  const updateBlogStatus = (id, status) => {
    axios
      .put(
        `http://localhost:5000/updateblogstatus/${id}`,
        { status },
        { withCredentials: true }
      )
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          Swal.fire("Success!", `Blog ${status} successfully`, "success");
          refetch();
        }
      });
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`http://localhost:5000/deleteblog/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            Swal.fire("Deleted!", "Blog has been deleted.", "success");
            refetch();
          }
        });
      }
    });
  };

  return (
    <div className="p-2 bg-white shadow-lg rounded-lg min-h-screen">
      <div className="flex justify-between items-center py-4 mb-6 flex-wrap">
        <h1 className="text-2xl font-semibold text-red-600">Blog Management</h1>
        <div className="flex gap-2">
          <select
            value={filter}
            onChange={handleFilterChange}
            className="p-2 border rounded-md text-sm focus:ring-2 focus:ring-red-600"
          >
            <option value="all">All</option>
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
          <Link className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700" to="/dashboard/content-management/add-blog">
            Add Blog
          </Link>
        </div>
      </div>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {filteredBlogs.length > 0 ? (
          filteredBlogs.map((item) => (
            <div key={item._id} className="bg-white p-4 shadow-md rounded-lg border">
              <h2 className="text-lg font-semibold text-red-600 min-h-16">{item.title}</h2>
              <div className="text-sm min-h-44 text-gray-600 my-2">
                <BlogPost htmlString={item.content.slice(0, 250)} />...
              </div>
              <p className="text-gray-700 font-medium">Status: {item.status}</p>
              {userData.role === "admin" && (
                <div className="flex justify-between mt-3">
                  {item.status === "draft" ? (
                    <button
                      className="bg-green-600 text-white py-1 px-3 rounded-md hover:bg-green-700"
                      onClick={() => updateBlogStatus(item._id, "published")}
                    >
                      Publish
                    </button>
                  ) : (
                    <button
                      className="bg-red-600 text-white py-1 px-3 rounded-md hover:bg-red-700"
                      onClick={() => updateBlogStatus(item._id, "draft")}
                    >
                      Unpublish
                    </button>
                  )}
                  <button
                    className="bg-red-600 text-white py-1 px-3 rounded-md hover:bg-red-700"
                    onClick={() => handleDelete(item._id)}
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="text-center text-red-500 col-span-full">No blogs found for the selected filter.</p>
        )}
      </div>
    </div>
  );
};

export default ContentManagement;
