import React from "react";
import "./Header.css";

const Header = () => {
  return (
    <div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12">
            <h1 className="mt-1 text-center text-light fs-1 fw-bolder mt-2 py-2">
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
