import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
// import { FaUserCircle } from "react-icons/fa";
// import { AuthContext } from "../provider/Authprovider";

const NavBar = () => {
  const { user, Logout } = useContext(AuthContext);

  console.log(user)
  return (
    <div className="navbar bg-slate-400 broder-none rounded-b-lg mb-5 mt-1">
      <div className="navbar-start">
        <div className="dropdown">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost  lg:hidden"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box  mt-3 w-52 p-2 shadow"
          >
            <div className="flex  justify-end flex-col gap-3  font-semibold text-base">
              <Link to="/">Home</Link>
              <Link to="/donation">Donation requests</Link>
              <Link to="/blogs">Blogs</Link>
              <Link to="/dashboard">Dashboard</Link>
              {/* <NavLink to="/login">Login</NavLink>
              <NavLink to="/register">Register</NavLink> */}
              {user ? (
          <div><NavLink to="/funding">Fundings</NavLink></div>
        ) : (
          <div>
            <Link
              to="/auth/login"
              className="btn btn-primary text-base-100 px-3 mr-2 py-1 "
            >
              Login
            </Link>
            <Link
              to="/auth/register"
              className="btn btn-primary text-base-100 px-3 py-1 "
            >
              Register
            </Link>
          </div>
        )}
        
            </div>
          </ul>
        </div>
        <a className="btn  -ml-5 md:-ml-0  btn-ghost text-lg md:text-xl">
          Blood Bank
        </a>

        
      </div>
      <div className="navbar-end lg:hidden">{user?.email && (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <div>
                  
                  <img
                    title={user.displayName}
                    className="w-10 h-10 border rounded-full"
                    src={user.photoURL}
                  />
                </div>
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm  dropdown-content bg-base-100 rounded-box z-[1] mt-0 -mr-5  
            w-54  p-2 shadow"
            >
              <div className=" font-semibold text-base px-1">
              <NavLink to="/dashboard">Dashboard</NavLink>
              <button
            onClick={Logout}
            className=""
          >
            Log Out
          </button>
              </div>
            </ul>
          </div>
        )}</div>
      <div className="navbar-end hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <div className="flex   gap-3 items-center font-semibold text-base">
            <NavLink to="/">Home</NavLink>
              <Link to="/donation">Donation requests</Link>
              <Link to="/blogs">Blogs</Link>
              
              
              {/* <NavLink to="/login">Login</NavLink>
              <NavLink className='bg-white px-2 border-none rounded-lg' to="/register">Register</NavLink> */}

        {user ? (
          <div><NavLink to="/funding">Fundings</NavLink></div>
        ) : (
          <div>
            <Link
              to="/auth/login"
              className="btn btn-primary text-base-100 px-3 mr-2 py-1 "
            >
              Login
            </Link>
            <Link
              to="/auth/register"
              className="btn btn-primary text-base-100 px-3 py-1 "
            >
              Register
            </Link>
          </div>
        )}
                      {user?.email && (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <div>
                  
                  <img
                    title={user.displayName}
                    className="w-10 h-10 border rounded-full"
                    src={user.photoURL}
                  />
                </div>
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm  dropdown-content bg-base-100 rounded-box z-[1] mt-0 -mr-5  
            w-54  p-2 shadow"
            >
              <div className=" font-semibold text-base px-1">
              <NavLink to="/dashboard">Dashboard</NavLink>
              <button
            onClick={Logout}
            className=""
          >
            Log Out
          </button>
              </div>
            </ul>
          </div>
        )}
          </div>
        </ul>
      </div>
      
    </div>
  );
};

export default NavBar;
