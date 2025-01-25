import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import axios from "axios";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
const BlogPost = ({ htmlString }) => {
  return (
    <div>
      <div dangerouslySetInnerHTML={{ __html: htmlString }} />
    </div>
  );
};

const ContentManagement = () => {
  const [id, setId] = useState("");
  //   const [blogs, setBlogs] = useState([]);
  const { userData } = useContext(AuthContext);
  //   useEffect(() => {
  //     axios
  //       .get("http://localhost:5000/all-blog")
  //       .then((res) => setBlogs(res.data));
  //   }, [userData,id]);
  const { data: blogs = [], refetch } = useQuery({
    queryKey: ["blogs"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:5000/all-blog");
      return res.data;
    },
  });
  console.log(blogs);

  const [filter, setFilter] = useState("all"); // State to store the selected filter

  // Handle dropdown change
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  // Filtered blogs based on the selected filter
  const filteredBlogs = blogs.filter((blog) => {
    if (filter === "all") return true; // Show all blogs
    return blog.status === filter; // Show only blogs matching the selected status
  });

  const makepublish = (id) => {
    const status = "published";
    const blog = {
      status,
    };
    axios
      .put(`http://localhost:5000/updateblogstatus/${id}`, blog, {
        withCredentials: true,
      })
      .then((res) => {
        // console.log(res.data);
        if (res.data.modifiedCount > 0) {
          Swal.fire({
            title: "Success!",
            text: "Blog Published succesfully",
            icon: "success",
            confirmButtonText: "Cool",
          });
          refetch();
          //   navigate(location?.state ? location.state : "/assignments");
        }
      });
  };
  const makeUnpublish = (id) => {
    const status = "draft";
    const blog = {
      status,
    };
    axios
      .put(`http://localhost:5000/updateblogstatus/${id}`, blog, {
        withCredentials: true,
      })
      .then((res) => {
        // console.log(res.data);
        if (res.data.modifiedCount > 0) {
          Swal.fire({
            title: "Success!",
            text: "Blog unpublished succesfully",
            icon: "success",
            confirmButtonText: "Cool",
          });
          refetch();
          //   navigate(location?.state ? location.state : "/assignments");
        }
      });
  };

  const handledelete = (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/deleteblog/${_id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((res) => {
            if (res.deletedCount > 0) {
              Swal.fire({
                title: "Success!",
                text: "Blog Deleted succesfully",
                icon: "success",
                confirmButtonText: "Cool",
              });
              // const filtereddata = donation.filter((user) => user._id !== _id);
              // setDoation(filtereddata);
              refetch();
            }
          });
      }
    });
  };

  return (
    <div>
      <div className="md:flex justify-between py-2">
        <div  className=" flex justify-start items-center gap-2 py-2">
          <h1>Blog List :</h1>

          {/* Dropdown for filtering */}
          <select
            value={filter}
            onChange={handleFilterChange}
            className="p-2 border rounded"
          >
            <option value="all">All</option>
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </div>
        <div className=" py-2">
          <Link className="btn" to="/dashboard/content-management/add-blog">
            Add blog
          </Link>
        </div>
        {/* Display filtered blogs */}
        
      </div>
      <div className="grid gap-2 grid-cols-6">
          {filteredBlogs.length > 0 ? (
            filteredBlogs.map((item) => (
              <div
                key={item._id}
                className="card  shadow-xl  col-span-6 md:col-span-3 lg:col-span-2"
              >
                <div className="card-body">
                  <h2 className="card-title">{item.title}</h2>
                  <div>
                    <BlogPost htmlString={item.content.slice(0, 100)} />
                    ...
                  </div>
                  <h2>Status:{item.status}</h2>
                  {userData.role == "admin" ? (
                    <span className="flex gap-1 justify-between">
                      <div className=" ">
                        {item.status == "draft" ? (
                          <button
                            onClick={() => {
                              makepublish(item._id);
                            }}
                            className="btn btn-sm btn-primary"
                          >
                            Publish
                          </button>
                        ) : (
                          <button
                            onClick={() => {
                              makeUnpublish(item._id);
                            }}
                            className="btn btn-sm btn-primary"
                          >
                            Unpublish
                          </button>
                        )}
                      </div>
                      <div className=" ">
                        <button
                          onClick={() => {
                            handledelete(item._id);
                          }}
                          className="btn btn-sm btn-primary"
                        >
                          Delete
                        </button>
                      </div>
                    </span>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p>No blogs found for the selected filter.</p>
          )}
        </div>
    </div>
  );
};

export default ContentManagement;
