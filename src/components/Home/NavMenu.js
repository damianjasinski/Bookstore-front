import React from "react";
import { Navigate } from "react-router-dom"
import { useState } from "react";


export const NavMenu = (props) => {
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
    <div className="justify-content-center mt-5 d-flex ">
      <div className="row border rounded  bg-light">
        <div className=" bg-light ">
          <nav className="text-center navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse " id="navbarNav">
              <ul className="navbar-nav ">
                <li className="nav-item ">
                  <a className="mx-5 mt-1 nav-link" href="/books">
                    <h4 className={props.books}>Books</h4> <span className="sr-only"></span>
                  </a>
                </li>
                <div className="vr"></div>
                <li className="nav-item">
                  <a className="mx-5 mt-1 nav-link" href="/orders">
                    <h4 className={props.orders}>Orders</h4>
                  </a>
                </li>
                <div className="vr"></div>
                <li className="nav-item">
                  <a className="mx-5 mt-1 nav-link" href="/search">
                    <h4 className={props.search}>Search</h4>
                  </a>
                </li>
                <div className="vr"></div>
                <li className="nav-item">
                  <a className="mx-5 mt-1 nav-link" href="/profile">
                    <h4 className={props.profile}>Profile</h4>
                  </a>
                </li>
                <div className="vr"></div>
                <li className="nav-item">
                  <a className="mx-5 mt-1 nav-link"href="/address">
                    <h4 className={props.address}>Address</h4>
                  </a>
                </li>
                <div className="vr"></div>
                <li className="nav-item">
                  <button onClick={Logout} className="btn btn-lg btn-outline-success mx-5 mt-2">Logout</button>
                </li>
              </ul>
            </div>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
};

NavMenu.defaultProps = {
  books : " ",
  orders : "",
  search : "",
  profile : "",
  address : ""
};

export default NavMenu;
