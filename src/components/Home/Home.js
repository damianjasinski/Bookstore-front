import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { GetData } from "../../services/GetData";

const Home = () => {

  const [loading, setLaoding] = useState(true)

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
        setLaoding(false)
      })
      .catch((err) => {
        console.log(err);
      });
  }, [loading]);

  if (!sessionStorage.getItem("token")) {
    return <Navigate to={"/"} />;
  }
  return (
    <Navigate to={"/books"} />
  );
};

export default Home;
