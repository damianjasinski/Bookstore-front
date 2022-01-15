import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { GetData } from "../../services/GetData";
import NavMenu from "./NavMenu";

const Home = () => {
  useEffect(() => {
    const token = JSON.parse(sessionStorage.getItem("token"));
    GetData("api/user-info.php", token)
      .then((response) => {
        sessionStorage.setItem("user", JSON.stringify(response.user));
      })
      .catch((err) => {
        console.log(err);
      });
    GetData("api/address/read.php", token)
      .then((response) => {
        sessionStorage.setItem("address", JSON.stringify(response.data));
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
      <NavMenu />
    </div>
  );
};

export default Home;
