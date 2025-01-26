import React, { useState } from "react";
import logo from "../Asset/logobig.png";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Footer from "../components/Footer";
const api_base_url = import.meta.env.VITE_API_BASE_URL;
const Login = () => {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [fullName,setFullName] = useState("");
  const navigate = useNavigate();

  const submitForm = (e) => {
    e.preventDefault();
    fetch(api_base_url + "/login", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        pwd: pwd,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("isLoggedIn", true);
          localStorage.setItem("fullName", data.fullName);

          window.location.href = "/";
        } else {
          toast.error(data.msg);
        }
      });
  };                                                                                                                                                                                                  

  
return (
  <>
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black px-4">
      <form
        onSubmit={submitForm}
        className="w-full max-w-md flex flex-col items-center bg-[#0f0e0e] p-6 sm:p-8 rounded-lg shadow-xl shadow-black/50"
      >
        
        <img className="w-48 sm:w-48 object-cover mb-6" src={logo} alt="Logo" />

      
        <div className="inputBox w-full mb-4">
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 bg-gray-800 text-white rounded shadow-md focus:outline-none focus:ring focus:ring-blue-500"
            required
          />
        </div>

        
        <div className="inputBox w-full mb-4">
          <input
            onChange={(e) => setPwd(e.target.value)}
            value={pwd}
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 bg-gray-800 text-white rounded shadow-md focus:outline-none focus:ring focus:ring-blue-500"
            required
          />
        </div>

    
        <p className="text-gray-400 text-sm mt-3 self-start">
          Don't have an account?{" "}
          <Link to="/signUp" className="text-blue-500">
            Sign Up
          </Link>
        </p>

        
        <button className="w-full py-2 mt-6 bg-blue-500 text-white rounded transition-all hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-500">
          Login
        </button>
      </form>
    </div>
    <Footer />
  </>
);
};

export default Login;
