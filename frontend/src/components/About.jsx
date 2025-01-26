import React from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";

const About = () => {
  return (
    <>
      <Navbar />
      <div className="about-container min-h-screen px-8 py-12 bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white flex flex-col items-center">
        <h1 className="text-3xl md:text-5xl font-extrabold mb-10 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-400">
          About CodeX
        </h1>
        <p className="text-base md:text-lg mb-8 text-center max-w-4xl leading-relaxed">
          <strong>CodeX</strong> is an innovative online Integrated Development Environment (IDE) designed to streamline coding and project management. Supporting multiple programming languages, including Python, JavaScript, C, C++, and Java, CodeX is your ultimate partner for achieving development excellence.
        </p>
        <div className="features-section text-center mb-10">
          <h2 className="text-xl md:text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-teal-500">
            Why Choose CodeX?
          </h2>
          <ul className="list-disc list-inside text-left text-sm md:text-base space-y-4">
            <li>Comprehensive multi-language support</li>
            <li>Instant, real-time code execution</li>
            <li>Efficient project management tools</li>
            <li>
              Auto-save functionality with <strong>Ctrl + S</strong>
            </li>
            <li>Secure, intuitive, and user-friendly interface</li>
          </ul>
        </div>
        <p className="text-sm md:text-base mt-6 text-center max-w-4xl leading-relaxed">
          Developed by <strong>Shabi Abbas</strong>, CodeX empowers developers, educators, and students by offering a seamless, efficient, and innovative coding experience.
        </p>
        <p className="text-sm md:text-base mt-4 text-center max-w-4xl leading-relaxed">
          Join us in revolutionizing the way coding is done. Experience simplicity, speed, and power with <strong>CodeX</strong>.
        </p>
      </div>
      <Footer />
    </>
  );
};

export default About;
