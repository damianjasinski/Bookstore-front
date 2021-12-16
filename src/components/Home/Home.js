import React from "react";
import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { GetData } from "../../services/GetData";

const Home = () => {
  const [logged, setLogged] = useState(true);
  const [user, setUser] = useState([]);

  useEffect(() => {
    const token = JSON.parse(sessionStorage.getItem("token"));
    console.log(token);
    GetData("login_register/user-info.php", token)
      .then((response) => {
        console.log(response);
        setUser(response.user);
        console.log(user)
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
    <div>
      <div className="row small-up-2 medium-up-3 large-up-4">
        <div className="columns">
          <input
            className="button large"
            type="button"
            name="logout"
            value="Logout"
            onClick={Logout}
          ></input>
        </div>
        <div className="medium-12">
          <h2> Welcome: {user.email}</h2>
        </div>
      </div>
    </div>
  );
};

export default Home;
