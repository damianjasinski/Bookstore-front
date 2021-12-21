import React from "react";
import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { NavMenu } from "../Home/NavMenu";
import { GetData } from "../../services/GetData";

const Books = () => {
  const [books, setBooks] = useState([]);
  const [logged, setLogged] = useState(true);

  useEffect(() => {
      const token = JSON.parse(sessionStorage.getItem("token"));
      console.log(token)
      GetData("api/book/read.php", token)
        .then((response) => {
          setBooks((response));
          console.log((response));
        })
        .catch( (err) => {
          console.log(err)
        });
    }, []);

  if (!sessionStorage.getItem("token")) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="container  mt-5">
      <NavMenu />

      <div className="h-72 mt-1 w-60 position-absolute bg-light border rounded" >
        <div className="">
          <h1> tu będzię kątęt</h1>
        </div>
      </div>
    </div>
  );
};

export default Books;
