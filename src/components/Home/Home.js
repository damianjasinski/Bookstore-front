import React from "react";
import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { GetData } from "../../services/GetData";
import NavMenu from "./NavMenu";

const Home = () => {
  const [logged, setLogged] = useState(true);
  const [user, setUser] = useState([]);

  useEffect(() => {
    const token = JSON.parse(sessionStorage.getItem("token"));
    console.log(token);
    GetData("login_register/user-info.php", token)
      .then((response) => {
        console.log(response);
        setUser(JSON.stringify(response.user));
        
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const Logout = () => {
    sessionStorage.setItem("token", "");
    sessionStorage.clear();
    setLogged(false);
  };

  if (!sessionStorage.getItem("token")) {
    return <Navigate to={"/"} />;
  }
  return (
    <div className="container position-absolute top-50 start-50 translate-middle">
      
      <NavMenu/>
    </div>
  );
};

export default Home;
