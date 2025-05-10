import React, { useState } from "react";
import logo from "../Asset/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Footer from "../components/Footer";
const api_base_url = import.meta.env.VITE_API_BASE_URL;
const Login = () => {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [fullName,setFullName] = useState("");
  const [loading, setLoading] = useState(false);



  const navigate = useNavigate();
   
  const submitForm = (e) => {
    e.preventDefault();
    setLoading(true); // Show spinner

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
        setLoading(false); // Hide spinner
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
    <div className="flex flex-col items-center justify-center min-h-screen ">
      <form
        onSubmit={submitForm}
        className="w-full max-w-md flex flex-col items-center bg-[#0f0e0e] p-6 sm:p-8 rounded-lg shadow-xl shadow-black/50"
      >
        
        <div className="flex items-center flex-shrink-0 mb-8">
                   <img className="h-12 w-16 mr-2" src={logo} alt="Logo" />
                   <span className="text-2xl tracking-wide">VirtualCode</span>
                 </div>
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

        
        <button
  className="mt-4 btnNormal bg-gradient-to-r from-orange-500 to-orange-800 transition-all hover:from-orange-600 hover:to-orange-900 px-[20px] py-2 text-white flex items-center justify-center rounded disabled:opacity-60"
  disabled={loading}
>
  {loading ? (
    <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
  ) : (
    "Login"
  )}
</button>

      </form>
    </div>
    <Footer />
  </>
);
};

export default Login;
