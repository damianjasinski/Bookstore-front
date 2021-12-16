import React from "react";
import { useState } from "react";
import { Navigate } from "react-router";
import { PostData } from "../../services/PostData";
import BookIco from "@mui/icons-material/LocalLibraryOutlined";

const Footer = () => {
  //inputs should be passed to PostData (fetch)
  const [inputs, setInputs] = useState({});
  //setting response success status
  const [success, setSuccess] = useState(false);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const signup = () => {
    PostData("login_register/register.php", inputs).then((result) => {
      console.log(JSON.stringify(inputs));
      let response = result;
      if (response.success === 1) {
        setSuccess(true);
        window.alert("Signup Complete");
      } else {
        window.alert(response.message);
      }
    });
  };
  

  if (success) {
    return <Navigate to={"/"} />;
  }

  if (sessionStorage.getItem("token")) {
    return <Navigate to={"/"} />;
  }

  return (
    <div class="container mx-auto">
      <div className="row position-absolute top-50 start-50 translate-middle">
        <div className="border rounded  text-center bg-light">
          <BookIco className="mt-5" fontSize="large" />

          <div className="row mx-3 mt-3 ">
            <h6 >Enter your first name</h6>
            <input
              name = "firstName"
              className="form-control"
              aria-describedby="emailHelp"
              placeholder="First name"
              onChange={handleChange}
            />
          </div>
          <div className="row mx-3 mt-3 ">
            <h6 >Enter your second name</h6>
            <input
              name = "secondName"
              className="form-control"
              aria-describedby="emailHelp"
              placeholder="Second name"
              onChange={handleChange}
            />
          </div>
          <div className="row mx-3 mt-3 ">
            <h6 >Enter your email</h6>
            <input
              name = "email"
              className="form-control"
              type = "email"
              aria-describedby="emailHelp"
              placeholder="email"
              onChange={handleChange}
            />

          </div>
          <div className="row mx-3 mt-3 ">
            <h6 >Enter password </h6>
            <input
              type="password"
              name = "password"
              className="form-control"
              placeholder="password"
              onChange={handleChange}
            />
          </div>

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
  );
};

export default Footer;
