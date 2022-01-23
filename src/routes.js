import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Welcome from "./components/Welcome/Welcome";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import NotFound from "./components/NotFound/NotFound";
import Home from "./components/Home/Home";
import Books from "./components/Books/Books";
import Profile from "./components/Profile/Profile";
import Address from "./components/Address/Address";
import NewAddress from "./components/Address/NewAddress";
import Orders from "./components/Orders/Orders";
import Search from "./components/Search/Search";
import AdminBooks from "./components/Admin/Books";
import AddBook from "./components/Admin/AddBook";
import AdminSearch from "./components/Admin/Search";

const Reroute = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/books" element={<Books />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/address" element={<Address />} />
        <Route path="/newaddress" element={<NewAddress />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/search" element={<Search />} />
        <Route path="/adminbooks" element={<AdminBooks />} />
        <Route path="/addbook" element={<AddBook />} />
        <Route path="/adminsearch" element={<AdminSearch />} />
        <Route path="*" element={<NotFound />} />
        
      </Routes>
    </Router>
  );
};

export default Reroute;
