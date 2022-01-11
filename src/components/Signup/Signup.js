import ArrowIco from '@mui/icons-material/ArrowBack';
import BookIco from "@mui/icons-material/LocalLibraryOutlined";
import React, { useState } from "react";
import { Navigate } from "react-router";
import { PostData } from "../../services/PostData";
import { ToastContainer } from "react-toastify";
import { notifyError } from "../../util/Toasts"
import { notifySucc } from "../../util/Toasts"
import { notifyWarn } from "../../util/Toasts"

const Signup = () => {
  //inputs should be passed to PostData (fetch)
  const [inputs, setInputs] = useState({
    password: "",
    password2: "",
    email: "",
    firstName: "",
    secondName: "",
  });
  //setting response success status
  const [success, setSuccess] = useState(false);
  const [change, setChange] = useState(false);

  const handleChange = (event) => {
    console.log(inputs)
    setChange(true)
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const signup = () => {
    if (change === false) 
      notifyWarn("Nothing is entered");
    else if (inputs.firstName.length < 3) 
      notifyError("First name is invalid");
    else if (inputs.secondName.length < 3)
      notifyError("Second name is invalid");
    else if (!validateEmail(inputs.email))
      notifyError("Email is invalid");
    else if (inputs.password.length === 0) 
      notifyError("Enter password");
    else if (inputs.password.length !== 0 && inputs.password.length < 8)
      notifyError("Password is too short");
    else if (inputs.password !== inputs.password2)
      notifyError("Passwords doesnt match");
    else {
      console.log("XD");
      PostData("login_register/register.php", inputs).then((result) => {
        console.log(JSON.stringify(inputs));
        let response = result;
        if (response.success === 1) {
          notifySucc("Signup Complete");
          setSuccess(true);
        } else {
          notifyError(response.message);
        }
      });
    }
  };

  const validateEmail = (email) => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      return true;
    }
    return false;
  };

  if (success) {
    return <Navigate to={"/"} />;
  }

  if (sessionStorage.getItem("token")) {
    return <Navigate to={"/"} />;
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
        <div className="border rounded bg-light">
          <div className="">
            <a href="/" style={{ color: "black" }}>
              <ArrowIco className="mt-3 mx-1" fontSize="large" />
            </a>
          </div>
          <div className=" text-center ">
            <BookIco className="mt-1" fontSize="large" />
          </div>

          <div className="row mx-3  text-center  mt-3 ">
            <h6 >Enter your first name</h6>
            <input
              name="firstName"
              className="form-control"
              aria-describedby="emailHelp"
              placeholder="First name"
              onChange={handleChange}
            />
          </div>
          <div className="row mx-3 mt-3  text-center ">
            <h6 >Enter your second name</h6>
            <input
              name="secondName"
              className="form-control"
              aria-describedby="emailHelp"
              placeholder="Second name"
              onChange={handleChange}
            />
          </div>
          <div className="row mx-3 mt-3  text-center ">
            <h6 >Enter your email</h6>
            <input
              name="email"
              className="form-control"
              type="email"
              aria-describedby="emailHelp"
              placeholder="email"
              onChange={handleChange}
            />

          </div>
          <div className="row mx-3 mt-3  text-center ">
            <h6 >Enter password </h6>
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="password"
              onChange={handleChange}
            />
          </div>
          <div className="row mx-3 mt-3  text-center ">
            <h6 >Re-type password </h6>
            <input
              type="password"
              name="password2"
              className="form-control"
              placeholder="password"
              onChange={handleChange}
            />
          </div>
          <div className="text-center">
            <a
              onClick={signup}
              type="button"
              className="mx-1 mt-4 fs-5 mb-4 p-2 btn btn-primary"
            >
              Signup
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
