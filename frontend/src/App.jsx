
import React from "react";
import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
 import NoPage from "./pages/NoPage";
 import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Editor from "./pages/Editor";
import About from "./components/About"
import Services from "./components/Services"

import Contact from "./components/Contact"


const App = () => {

  return (
    <>
      <BrowserRouter>
        <RouteHandler />
      </BrowserRouter>
    </>
  );
};

const RouteHandler = () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={isLoggedIn ? <Home /> : <Navigate to={"/login"} />}
        />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/editor/:id"
          element={isLoggedIn ? <Editor /> : <Navigate to={"/login"} />}
        />

        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </>
  );
};

export default App
