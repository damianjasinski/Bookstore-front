import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { GetData } from "../../services/GetData";

const Home = () => {
  useEffect(() => {
   
    if (sessionStorage.getItem("role") === "admin") {
      return <Navigate to={"/AdminNavMenu"} />;
    }
  
    if (!sessionStorage.getItem("token")) {
      return <Navigate to={"/books"} />;
    }
          
  }, []);



};

export default Home;
//unused
