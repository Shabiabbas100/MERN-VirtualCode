import React, { useState } from "react";
import logo from "../Asset/logobig.png";
import { Link, useNavigate } from "react-router-dom";
 import { toast } from "react-toastify";
import Footer from "../components/Footer";
const api_base_url = import.meta.env.VITE_API_BASE_URL;
const SignUp = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const navigate = useNavigate();
  const submitForm = (e) => {
    
    e.preventDefault();
    fetch(api_base_url + "/signUp", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fullName: fullName,
        email: email,
        pwd: pwd,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          navigate("/login");
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
        className="w-full max-w-md flex flex-col items-center bg-[#0f0e0e] p-6 sm:p-8 rounded-lg shadow-xl shadow-red/50"
      >
        
        <img
          className="w-48 sm:w-48 object-cover mb-4"
          src={logo}
          alt="Logo"
        />

     
        <div className="inputBox w-full mb-4">
          <input
            onChange={(e) => setFullName(e.target.value)}
            value={fullName}
            type="text"
            placeholder="Full Name"
            className="w-full px-4 py-2 bg-gray-800 text-white rounded focus:outline-none focus:ring focus:ring-blue-500"
            required
          />
        </div>

        <div className="inputBox w-full mb-4">
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 bg-gray-800 text-white rounded focus:outline-none focus:ring focus:ring-blue-500"
            required
          />
        </div>

        <div className="inputBox w-full mb-4">
          <input
            onChange={(e) => setPwd(e.target.value)}
            value={pwd}
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 bg-gray-800 text-white rounded focus:outline-none focus:ring focus:ring-blue-500"
            required
          />
        </div>

        
        <p className="text-gray-400 text-sm mt-3 self-start">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500">
            Login
          </Link>
        </p>

        
        <button className="w-full py-2 mt-6 bg-blue-500 text-white rounded transition-all hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-500">
          Sign Up
        </button>
      </form>
    </div>
    <Footer />
  </>
);

};

 export default SignUp;
