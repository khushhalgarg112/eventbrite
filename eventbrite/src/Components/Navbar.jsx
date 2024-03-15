import { useState } from "react";
import { CiHeart } from "react-icons/ci";
import { FaPlus } from "react-icons/fa";
import { MdOutlineEventNote } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import img from "../assets/logo.png";

// Navbar components
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const user = localStorage.getItem("user");

  const handleNavigateCreate = () => {
    setTimeout(() => {
      navigate("/create");
    }, 500);
  };
  const handleNavigateMyLike = () => {
    setTimeout(() => {
      navigate("/likes");
    }, 500);
  };
  const handleNavigateMyEvent = () => {
    setTimeout(() => {
      navigate("/myevent");
    }, 500);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location = "/login";
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    //Make it Fix at the top
    <nav className="border-b-2 p-4 sticky top-0 z-10 bg-white">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          <img
            src={img}
            alt="Logo"
            className="h-8"
            onClick={() => {
              navigate("/");
            }}
          />
        </div>

        {/* Search Bar */}
        <div className="flex-grow mx-4">
          <input
            type="text"
            placeholder="Search"
            className="w-4/5 px-4 py-2 rounded-full border-2 bg-white text-gray-500 focus:outline-none"
          />
        </div>

        {/* Icon-based Options */}
        <div className="w-72 flex  justify-between mr-20">
          <button
            className="flex-cols text-gray-500 transition-all hover:text-gray-700 items-center cursor-pointer"
            onClick={handleNavigateCreate}
          >
            <FaPlus className="ml-10" />
            <p className="font-rubik">Create a Event</p>
          </button>
          <button
            className="flex-cols text-gray-500 transition-all hover:text-gray-700 justify-center items-center cursor-pointer"
            onClick={handleNavigateMyLike}
          >
            <CiHeart className="ml-2" />
            <p className="font-rubik">Likes</p>
          </button>
          <button
            className="flex-cols text-gray-500 transition-all hover:text-gray-700 justify-center items-center cursor-pointer"
            onClick={handleNavigateMyEvent}
          >
            <MdOutlineEventNote className="ml-6" />
            <p className="font-rubik">My Event</p>
          </button>
        </div>

        {/* Dropdown */}
        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="text-gray-500 flex items-center space-x-2"
          >
            <span className="text-rubik">{user ? user : "Account"}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              {/* Dropdown Icon */}
              <path
                fillRule="evenodd"
                d="M10 12a1 1 0 0 1-.707-.293l-4-4a1 1 0 1 1 1.414-1.414L10 9.586l3.293-3.293a1 1 0 1 1 1.414 1.414l-4 4a1 1 0 0 1-.707.293z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          {isOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-500 hover:bg-gray-400 hover:text-white"
              >
                Profile
              </a>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-500 hover:bg-gray-400 hover:text-white"
                onClick={handleLogout}
              >
                Logout
              </a>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
