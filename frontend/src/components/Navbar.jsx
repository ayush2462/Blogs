import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { BsSearch } from 'react-icons/bs';
import { FaBars } from 'react-icons/fa';
import Menu from './Menu';
import { UserContext } from '../context/UserContext';

const Navbar = () => {
  const [prompt, setPrompt] = useState('');
  const [menu, setMenu] = useState(false);
  const navigate = useNavigate();
  const path = useLocation().pathname;
  const { user } = useContext(UserContext);

  const showMenu = () => {
    setMenu(!menu);
  };

  const handleSearch = () => {
    navigate(prompt ? `?search=${prompt}` : '/');
  };

  return (
    <div className="bg-black text-white">
      <div className="flex items-center justify-between px-6 md:px-[200px] py-4">
        <h1 className="text-lg md:text-xl font-extrabold">
          <Link to="/">BLOG PAGE</Link>
        </h1>
        {path === '/' && (
          <div className="flex items-center space-x-0">
            <input
              type="text"
              placeholder="Search a Post"
              className="outline-none px-3 text-black bg-white rounded-l-xl"
              onChange={(e) => setPrompt(e.target.value)}
            />
            <p
              onClick={handleSearch}
              className="cursor-pointer p-1 bg-white text-black rounded-r-xl"
            >
              <BsSearch />
            </p>
          </div>
        )}
        <div className="hidden md:flex items-center space-x-2 md:space-x-4">
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
            <div onClick={showMenu} className="relative cursor-pointer">
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
          <FaBars />
          {menu && <Menu />}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
