import React from "react";
import { Navigate } from "react-router-dom"
import { useState } from "react";

export const AdminNavMenu = (props) => {
  const [logged, setLogged] = useState(true);

  const Logout = () => {
    sessionStorage.setItem("token", "");
    sessionStorage.clear();
    setLogged(false);
  };

  if (sessionStorage.getItem("role") !== 'admin' || !sessionStorage.getItem("token") ) {
    return <Navigate to={"/"} />;
  }
  
  return (
    <div className="justify-content-center mt-4 d-flex ">
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
                  <a className=" mt-1 mx-6 nav-link" href="/addbook">
                    <h4 className={props.addbook}>Add Book</h4>
                  </a>
                </li>
                <div className="vr"></div>
                <li className="nav-item">
                  <a className="mx-5 mt-1 nav-link" href="/adminsearch">
                    <h4 className={props.search}>Search Book</h4>
                  </a>
                </li>
                <div className="vr"></div>
                <li className="nav-item">
                  <a className="mx-5 mt-1 nav-link" href="/adminusers">
                    <h4 className={props.users}>Users</h4>
                  </a>
                </li>
                
                <div className="vr"></div>
                <li className="nav-item">
                  <button onClick={Logout} className="btn btn-lg btn-outline-success mx-6 mt-2">Logout</button>
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

AdminNavMenu.defaultProps = {
  books : " ",
  addbook : "",
  search : "",
  users : ""
};

export default AdminNavMenu;
