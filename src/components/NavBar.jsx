import React, { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import { Menu, X } from "lucide-react"; // Icons for hamburger menu

const NavBar = () => {
  const { user, userData, Logout } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-red-600 text-white  py-4  md:py-5 mb-5 shadow-lg relative">
      <div className="flex justify-between items-center container mx-auto px-4">
        {/* Logo */}
        <h3 className="text-white text-3xl font-bold">RedHope</h3>

        {/* User Image & Hamburger Icon for Mobile */}
        <div className="lg:hidden flex items-center space-x-3">
          {user?.email && (
            <img
              title={userData.name}
              className="w-10 h-10 border rounded-full"
              src={userData.photo}
              alt="User"
            />
          )}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {isOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
          </button>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center  space-x-6 font-semibold text-lg">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-yellow-300 border-b-2 border-yellow-300 pb-1"
                : "hover:text-gray-200"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/donation"
            className={({ isActive }) =>
              isActive
                ? "text-yellow-300 border-b-2 border-yellow-300 pb-1"
                : "hover:text-gray-200"
            }
          >
            Donation Requests
          </NavLink>
          <NavLink
            to="/blogs"
            className={({ isActive }) =>
              isActive
                ? "text-yellow-300 border-b-2 border-yellow-300 pb-1"
                : "hover:text-gray-200"
            }
          >
            Blogs
          </NavLink>
          {user && (
            <NavLink
              to="/funding"
              className={({ isActive }) =>
                isActive
                  ? "text-yellow-300 border-b-2 border-yellow-300 pb-1"
                  : "hover:text-gray-200"
              }
            >
              Fundings
            </NavLink>
          )}
          {user && (
            <NavLink
              to="/dashboard/home"
              className={({ isActive }) =>
                isActive
                  ? "text-yellow-300 border-b-2 border-yellow-300 pb-1"
                  : "hover:text-gray-200"
              }
            >
              Dashboard
            </NavLink>
          )}
          {user ? (
            <button
              onClick={Logout}
              className="bg-white text-red-600 px-4 py-2 rounded hover:bg-gray-200"
            >
              Log Out
            </button>
          ) : (
            <>
              <Link
                to="/auth/login"
                className="bg-white text-red-600 px-4 py-2 rounded hover:bg-gray-200"
              >
                Login
              </Link>
              <Link
                to="/auth/register"
                className="bg-white text-red-600 px-4 py-2 rounded hover:bg-gray-200"
              >
                Register
              </Link>
            </>
          )}
          {/* User Image on Desktop */}
          {user?.email && (
            <img
              title={userData.name}
              className="w-10 h-10 border rounded-full"
              src={userData.photo}
              alt="User"
            />
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden flex flex-col mt-3 space-y-3 bg-white text-red-600 rounded-lg shadow-md p-5 absolute right-4 top-16 w-56 z-50">
          <NavLink
            to="/"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              isActive ? "text-red-500 font-bold" : "hover:text-gray-600"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/donation"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              isActive ? "text-red-500 font-bold" : "hover:text-gray-600"
            }
          >
            Donation Requests
          </NavLink>
          <NavLink
            to="/blogs"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              isActive ? "text-red-500 font-bold" : "hover:text-gray-600"
            }
          >
            Blogs
          </NavLink>
          {user && (
            <NavLink
              to="/funding"
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                isActive ? "text-red-500 font-bold" : "hover:text-gray-600"
              }
            >
              Fundings
            </NavLink>
          )}
          {user && (
            <NavLink
              to="/dashboard"
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                isActive ? "text-red-500 font-bold" : "hover:text-gray-600"
              }
            >
              Dashboard
            </NavLink>
          )}
          {user ? (
            <button
              onClick={Logout}
              className="bg-red-600 text-white px-4 py-2 rounded"
            >
              Log Out
            </button>
          ) : (
            <>
              <Link
                to="/auth/login"
                className="bg-red-600 text-white px-4 py-2 rounded"
              >
                Login
              </Link>
              <Link
                to="/auth/register"
                className="bg-red-600 text-white px-4 py-2 rounded"
              >
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default NavBar;
