import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Welcome from "./components/Welcome/Welcome";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import NotFound from "./components/NotFound/NotFound";
import Home from "./components/Home/Home";
import Books from "./components/Books/Books";

const Reroute = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/books" element={<Books />} />
        <Route path="*" element={<NotFound />} />
        
      </Routes>
    </Router>
  );
};

export default Reroute;
