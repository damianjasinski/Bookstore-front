import ArrowIco from '@mui/icons-material/ArrowBack';
import BookIco from "@mui/icons-material/LocalLibraryOutlined";
import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { PostData } from "../../services/PostData";
import { notifyError } from "../../util/Toasts"
import { ToastContainer } from "react-toastify";


const Login = () => {
  //inputs should be passed to PostData (fetch)
  const [inputs, setInputs] = useState({});
  //setting response success status
  const [success, setSuccess] = useState(false);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const login = () => {
    PostData("login_register/login.php", inputs).then((result) => {
      let response = result;
      if (response.success === 1) {
        sessionStorage.setItem("token", JSON.stringify([response.token]));
        sessionStorage.setItem("role", [response.role]);
        setSuccess(true);
      } else {
        notifyError("Invalid email or password!");
      }
    }, [success]);
  };


  if (success) {
    return <Navigate to={"/books"} />;
  }

  if (sessionStorage.getItem("token")) {
    return <Navigate to={"/books"} />;
  }



  return (
    <div className="container mx-auto">
      <ToastContainer
        position="top-center"
        autoClose={2500}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="row position-absolute top-50 start-50 translate-middle">
        <div className="border rounded  bg-light col-12">
          <div className="">
            <a href="/" style={{ color: "black" }}>
              <ArrowIco className="mt-3 mx-1" fontSize="large" />
            </a>
          </div>
          <div className="text-center">
            <BookIco className="" fontSize="large" />
          </div>
          <div className="row mx-3 mt-4 text-center">
            <h6 htmlFor="exampleInputEmail1">Enter Email address</h6>
            <input
              type="email"
              name="email"
              className="form-control"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              onChange={handleChange}
            />

          </div>
          <div className="row mx-3 mt-4 text-center">
            <h6 htmlFor="exampleInputpwd">Enter password </h6>
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Enter password"
              onChange={handleChange}
            />
          </div>
          <div className="text-center">
            <a
              type="button"
              onClick={login}
              className="mx-1 mt-4 fs-5 mb-4 p-2 btn btn-primary"
            >
              Login
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
