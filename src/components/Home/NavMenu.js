import React from "react";
import { Navigate } from "react-router-dom"
import { useState } from "react"

export const NavMenu = () => {
  
  const [logged, setLogged] = useState(true);
  
  const Logout = () => {
    sessionStorage.setItem("token", "");
    sessionStorage.clear();
    setLogged(false);
  };
  
  if (!sessionStorage.getItem("token")) {
    return <Navigate to={"/"} />;
  }
  
  return (
    <div className="justify-content-center d-flex ">
      <div className="row border rounded  bg-light">
        <div className=" bg-light ">
          <nav className="text-center navbar navbar-expand-lg navbar-light bg-light">
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse " id="navbarNav">
              <ul className="navbar-nav ">
                <li className="nav-item active ">
                  <a className="mx-5 mt-1 nav-link " href="/books">
                    <h3>Books</h3> <span className="sr-only"></span>
                  </a>
                </li>
                <div className="vr"></div>
                <li className="nav-item">
                  <a className="mx-5 mt-1 nav-link" href="#">
                    <h3>Orders</h3>
                  </a>
                </li>
                <div className="vr"></div>
                <li className="nav-item">
                  <a className="mx-5 mt-1 nav-link" href="#">
                    <h3>Search</h3>
                  </a>
                </li>
                <div className="vr"></div>
                <li className="nav-item">
                  <a className="mx-5 mt-1 nav-link" href="/profile">
                    <h3>Profile</h3>
                  </a>
                </li>
                <div className="vr"></div>
                <li className="nav-item">
                  <a className="mx-5 mt-1 nav-link" href="/profile">
                    <h3>Address</h3>
                  </a>
                </li>
                <div className="vr"></div>
                <li className="nav-item">
                  <button onClick={Logout} className="btn btn-lg btn-outline-success mx-6 mt-2">Logout</button>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
};
export default NavMenu;
