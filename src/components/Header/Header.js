import "./Header.css";
import React from "react";
import { Navigate } from "react-router";
import logo from "./../../resources/book.png"; // with import

const Header = () => {
  return (
    <div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12">
            <h1 className="mt-4 text-center text-light fs-1 fw-bolder mt-2 py-2">
              Hello! Book your book.
            </h1>
          </div>
          <div className="col-md-1"></div>
        </div>
      </div>
    </div>
  );
};

export default Header;
