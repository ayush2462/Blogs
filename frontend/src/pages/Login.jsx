import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { UserContext } from "../context/UserContext";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await fetch("api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email: email, password: password }),
      });
      if (res.ok) {
        const data = await res.json();
        const cookies = res.headers.get("Set-Cookie");
        console.warn("Data", data);
        console.warn("Cookies", cookies);
        setUser(data);
      } else {
        console.error("Request failed with status", res.status);
      }
      navigate("/");
    } catch (err) {
      setError(true);
      console.log(err);
    }
  };
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <div className="flex items-center justify-between px-6 md:px-40 py-4 bg-white shadow-md">
        <h1 className="text-lg md:text-xl font-extrabold text-gray-800">
          <Link to="/">Blogosphere</Link>
        </h1>
        <h3 className="text-gray-600">
          <Link to="/register" className="hover:underline">
            Register
          </Link>
        </h3>
      </div>
      <div className="flex-grow flex justify-center items-center">
        <div className="flex flex-col justify-center items-center space-y-4 w-11/12 md:w-1/3 bg-white p-8 rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold text-gray-800">
            Login to your Account
          </h1>

          <input
            type="email"
            placeholder="Enter your Email"
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-400 outline-none"
          />
          <input
            type="password"
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-400 outline-none"
          />
          <button
            onClick={handleLogin}
            className="w-full px-4 py-2 text-lg font-bold text-white bg-gray-800 rounded-md hover:bg-gray-700 focus:bg-gray-900 transition duration-200"
          >
            Login
          </button>
          {error && <h3 className="text-red-500">Something went wrong</h3>}
          <div className="text-center">
            <p className="text-gray-600">New Here</p>
            <p>
              <Link to="/register" className="text-gray-800 hover:underline">
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
