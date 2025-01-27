import React from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";

const Services = () => {
  return (
    <>
      <Navbar />
      <div className="services-container min-h-screen px-8 py-12 bg-gradient-to-br from-gray-800 via-gray-700 to-black text-white flex flex-col justify-start items-center">
        <div className="w-full mb-12 text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-green-400">
            Our Services
          </h1>
          <p className="text-base md:text-lg leading-relaxed max-w-3xl mx-auto text-gray-300">
            At <strong>CodeX</strong>, we provide a suite of services tailored to developers, educators, and students. Streamline your coding experience with powerful tools, efficient workflows, and a user-friendly interface.
          </p>
        </div>

        <div className="services-list grid gap-8 sm:grid-cols-2 lg:grid-cols-3 text-center w-full px-4">
          <div className="service-item bg-gradient-to-br from-light-green-500 to-blue-600 rounded-2xl shadow-lg p-6">
            <h2 className="text-xl md:text-2xl font-bold mb-4 text-white">
              Multi-Language Support
            </h2>
            <p className="text-sm md:text-base leading-relaxed text-gray-200">
              Develop in multiple languages, including Python, JavaScript, C, C++, Java, and more—perfect for diverse coding needs.
            </p>
          </div>

          <div className="service-item bg-gradient-to-br from-light-green-500 to-blue-600 rounded-2xl shadow-lg p-6">
            <h2 className="text-xl md:text-2xl font-bold mb-4 text-white">
              Real-Time Code Execution
            </h2>
            <p className="text-sm md:text-base leading-relaxed text-gray-200">
              Run your code instantly and debug efficiently with our real-time execution feature, speeding up your workflow.
            </p>
          </div>

          <div className="service-item bg-gradient-to-br from-light-green-500 to-blue-600 rounded-2xl shadow-lg p-6">
            <h2 className="text-xl md:text-2xl font-bold mb-4 text-white">
              Project Management
            </h2>
            <p className="text-sm md:text-base leading-relaxed text-gray-200">
              Manage your projects seamlessly. Create, edit, and organize projects with a clean, intuitive interface.
            </p>
          </div>

          <div className="service-item bg-gradient-to-br from-light-green-500 to-blue-600 rounded-2xl shadow-lg p-6">
            <h2 className="text-xl md:text-2xl font-bold mb-4 text-white">
              Auto-Save Functionality
            </h2>
            <p className="text-sm md:text-base leading-relaxed text-gray-200">
              Enjoy peace of mind with automatic saving. Press <strong>Ctrl + S</strong> or <strong>Save Button </strong>to save your work instantly.
            </p>
          </div>

          <div className="service-item bg-gradient-to-br from-light-green-500 to-blue-600 rounded-2xl shadow-lg p-6">
            <h2 className="text-xl md:text-2xl font-bold mb-4 text-white">
              Secure and User-Friendly
            </h2>
            <p className="text-sm md:text-base leading-relaxed text-gray-200">
              Your data is protected with secure logins, and the interface is designed for an intuitive user experience.
            </p>
          </div>

          <div className="service-item bg-gradient-to-br from-light-green-500 to-blue-600 rounded-2xl shadow-lg p-6">
            <h2 className="text-xl md:text-2xl font-bold mb-4 text-white">
              Community Driven
            </h2>
            <p className="text-sm md:text-base leading-relaxed text-gray-200">
              Join a growing community of developers and collaborate, learn, and share knowledge to enhance your coding journey.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Services;
