import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigation } from "react-router-dom";
import BsSearch from "react-icons/bs";
import FaBars from "react-icons/fa";
import Menu from "./Menu";
import UserContext from "../context/UserContext";
const Navbar = () => {
  const [prompt, setPrompt] = useState();
  const [menu, setMenu] = useState(false);
  const navigate = useNavigation();
  const path = useLocation().pathname;
const showMenu = ()=>{
  setMenu(!menu)
}
const {user} = useContext(UserContext)

  return (
    <div>
      <div className="flex items-center justify-between px-6 md:px-[200px] py-4 bg-black text-white">
        <h1 className="text-lg md:text-xl font-extrabold">
          <Link to="/">Blog PAGE</Link>
        </h1>
        {path === "/" && (
          <div
            onChange={(e) => setPrompt(e.target.value)}
            className="flex justify-center items-center space-x-0"
          >
            <input
              type="text"
              placeholder="Search a Post"
              className="outline-none px-3 text-black bg-white rounded-1-xl"
            />
            <p
              onClick={() =>
                navigate(prompt ? "?search" + prompt : navigate("/"))
              }
              className="cursor-pointer p-1 bg-white text-black rounded-r-xl"
            >
              <BsSearch />
            </p>
          </div>
        )}
        <div className="hidden md:flex items-center justify-center space-x-2 md:space-x-4">
          {user ? (
            <h3>
              <Link to="/write">Write</Link>
            </h3>
          ) : (
            <h3>
              <Link to="/login">Login</Link>
            </h3>
          )}
          {user ? (
            <div onClick={showMenu}>
              <p className="cursor-pointer relative"></p>
              <FaBars />
              {menu && <Menu />}
            </div>
          ) : (
            <h3>
              <Link to="/register">Register</Link>
            </h3>
          )}
        </div>
        <div className="md:hidden text-lg" onClick={showMenu}>
          <p className="cursor-pointer relative">
            <FaBars/>
          </p>
          {menu && <Menu/>}

        </div>
      </div>
    </div>
  );
};

export default Navbar;
