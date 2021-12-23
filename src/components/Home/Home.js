import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { GetData } from "../../services/GetData";
import NavMenu from "./NavMenu";

const Home = () => {
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



  if (!sessionStorage.getItem("token")) {
    return <Navigate to={"/"} />;
  }
  return (
    <div className="container d-flex flex-column mt-3">
      
      <NavMenu/>
    </div>
  );
};

export default Home;
