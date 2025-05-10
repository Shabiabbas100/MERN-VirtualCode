import React, { useState } from "react";
import Footer from "./Footer";
import Navbar from './Navbar'
const api_base_url = import.meta.env.VITE_API_BASE_URL;
const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "", 
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(api_base_url + "/sendMessage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData), 
      });

      const data = await response.json();
      if (response.status === 200) {
        setIsSubmitted(true);
        setFormData({
          name: "",
          email: "",
          subject: "", 
          message: "",
        });
      } else {
        setError(data.msg || "Failed to send message. Please try again.");
      }
    } catch (err) {
      setError("Failed to send message. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  
  return (
    <>
      <div className=" min-h-screen flex flex-col">
        <Navbar />
        
        <div className="contact-container text-white flex flex-col px-6 py-10 flex-grow">
          
          {/* Social Links */}
          <header className="w-full text-center mb-6">
            <div className="flex justify-center space-x-6 text-xl">
              <a href="https://linkedin.com/in/shabiabbas100" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                LinkedIn
              </a>
              <a href="https://github.com/Shabiabbas100" target="_blank" rel="noopener noreferrer" className="hover:underline">
                GitHub
              </a>
              <a href="mailto:shabiabbs100@gmail.com" className="text-orange-700 hover:underline">
                Email
              </a>
            </div>
          </header>
  
          <h1 className="text-4xl font-bold mb-4 text-center">Contact Us</h1>
  
          {isSubmitted ? (
            <div className="text-center text-lg mx-auto">
              <p>Thank you for your message! We will get back to you soon.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="w-full max-w-md md:max-w-lg bg-[#3b3f46] p-8 rounded-lg shadow-lg mx-auto">
              
              {/* Name */}
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-semibold mb-2">Name</label>
                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} 
                  className="w-full p-3 rounded-md bg-[#1f2228] text-white focus:outline-none" required />
              </div>
  
              {/* Email */}
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-semibold mb-2">Email</label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} 
                  className="w-full p-3 rounded-md bg-[#1f2228] text-white focus:outline-none" required />
              </div>
  
              {/* Subject */}
              <div className="mb-4">
                <label htmlFor="subject" className="block text-sm font-semibold mb-2">Subject</label>
                <input type="text" id="subject" name="subject" value={formData.subject} onChange={handleChange} 
                  className="w-full p-3 rounded-md bg-[#1f2228] text-white focus:outline-none" required />
              </div>
  
              {/* Message */}
              <div className="mb-4">
                <label htmlFor="message" className="block text-sm font-semibold mb-2">Message</label>
                <textarea id="message" name="message" value={formData.message} onChange={handleChange} 
                  className="w-full p-3 rounded-md bg-[#1f2228] text-white focus:outline-none" rows="4" required />
              </div>
  
              {/* Error Message */}
              {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
  
              {/* Submit Button */}
              <button type="submit" className="btnNormal bg-gradient-to-r from-orange-500 to-orange-800 transition-all hover:from-orange-600 hover:to-orange-900 px-[20px]"
 disabled={isLoading}>
                {isLoading ? "Sending..." : "Send Message"}
              </button>
            </form>
          )}
        </div>
  
        <Footer />
      </div>
    </>
  );
};

export default Contact;
