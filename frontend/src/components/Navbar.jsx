import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { FaBars } from "react-icons/fa";
import Menu from "./Menu";
import { UserContext } from "../context/UserContext";

const Navbar = () => {
  const [prompt, setPrompt] = useState("");
  const [menu, setMenu] = useState(false);
  const navigate = useNavigate();
  const path = useLocation().pathname;
  const { user } = useContext(UserContext);

  const showMenu = () => {
    setMenu(!menu);
  };

  const handleSearch = () => {
    navigate(prompt ? `?search=${prompt}` : "/");
  };

  return (
    <div className="bg-gray-900 text-white shadow-md">
      <div className="flex items-center justify-between px-6 md:px-16 py-4">
        <h1 className="text-2xl font-bold">
          <Link to="/" className="hover:text-gray-300 transition-colors">
            BLOG PAGE
          </Link>
        </h1>
        {path === "/" && (
          <div className="flex items-center space-x-2">
            <input
              type="text"
              placeholder="Search a Post"
              className="px-4 py-2 text-black bg-white rounded-l-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
              onChange={(e) => setPrompt(e.target.value)}
            />
            <button
              onClick={handleSearch}
              className="p-2 bg-white text-black rounded-r-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-400"
            >
              <BsSearch />
            </button>
          </div>
        )}
        <div className="hidden md:flex items-center space-x-4">
          {user ? (
            <h3>
              <Link
                to="/write"
                className="hover:text-gray-300 transition-colors"
              >
                Write
              </Link>
            </h3>
          ) : (
            <h3>
              <Link
                to="/login"
                className="hover:text-gray-300 transition-colors"
              >
                Login
              </Link>
            </h3>
          )}
          {user ? (
            <div onClick={showMenu} className="relative cursor-pointer">
              <FaBars className="text-xl hover:text-gray-300 transition-colors" />
              {menu && <Menu />}
            </div>
          ) : (
            <h3>
              <Link
                to="/register"
                className="hover:text-gray-300 transition-colors"
              >
                Register
              </Link>
            </h3>
          )}
        </div>
        <div className="md:hidden text-xl" onClick={showMenu}>
          <FaBars className="hover:text-gray-300 transition-colors" />
          {menu && <Menu />}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
