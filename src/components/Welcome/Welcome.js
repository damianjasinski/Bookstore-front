import React from "react";
import { Navigate } from "react-router-dom";
import BookIco from "@mui/icons-material/LocalLibraryOutlined";

const Welcome = () => {
  if (sessionStorage.getItem("token")) {
    return <Navigate to={"/home"} />;
  }
  return (
    <div className="container mx-auto">
      <div className="row position-absolute top-50 start-50 translate-middle">
        <div className="border rounded  text-center bg-light">
          <BookIco className="mt-5" fontSize="large" />
          <h1 className="mt-5 px-5">First time? Signup!</h1>
          <h4 className="mx-5 px-5 pb-5">or login :-)</h4>
          <a
            type="button"
            href="/login"
            className="mx-1 fs-5 mb-5 p-2 btn btn-primary"
          >
            Login
          </a>
          <a
            type="button"
            href="/Signup"
            className="mx-1 fs-5 mb-5 p-2 btn btn-success"
          >
            Signup
          </a>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
