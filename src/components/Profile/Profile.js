import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { GetData } from "../../services/GetData";
import { PostData } from "../../services/PostData";
import { NavMenu } from "../Home/NavMenu";
import { ToastContainer } from "react-toastify";
import { notifyError, notifyWarn, notifySucc } from "../../util/Toasts";
import AccountBoxIcon from "@mui/icons-material/AccountBox";

const Profile = () => {
  //inputs should be passed to PostData (fetch)
  const [inputs, setInputs] = useState({
    password: "",
    password2: "",
    email: "",
    phoneNumber: "",
    firstName: "",
    secondName: "",
  });
  //store current user data
  const [user, setUser] = useState([]);
  const [change, setChange] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = JSON.parse(sessionStorage.getItem("token"));
    GetData("api/user-info.php", token)
      .then((response) => {
        setUser(response.user);
        sessionStorage.setItem("user", JSON.stringify(response.user));
        for (const [key, value] of Object.entries(user)) {
          setInputs((values) => ({ ...values, [key]: value }));
        }
        setLoading(false);
        console.log(user);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [loading]);

  const handleChange = (event) => {
    if (change === false) {
      setChange(true);
    }
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
    console.log(inputs);
  };

  const sendUpdateUserRequest = () => {
    if (change === false) {
      notifyWarn("Nothing to update");
    } else {
      if (inputs.firstName.length < 3) notifyError("First name is invalid");
      else if (inputs.secondName.length < 3)
        notifyError("Second name is invalid");
      else if (!validateEmail(inputs.email)) notifyError("Email is invalid");
      else if (!validatePhoneNumber(inputs.phoneNumber))
        notifyError("Phone number is invalid");
      else if (inputs.password.length !== 0 && inputs.password.length < 8)
        notifyError("Password is too short");
      else if (inputs.password !== inputs.password2)
        notifyError("Passwords doesnt match");
      else {
        console.log(inputs.password.length);
        console.log("all ok");
        const token = JSON.parse(sessionStorage.getItem("token"));
        PostData("api/profile/update.php", inputs, token).then((result) => {
          let response = result;
          if (response.success === 1) {
            notifySucc("Update complete");
          } else {
            notifyWarn(response.message);
          }
        });
      }
    }
  };

  const validateEmail = (email) => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      return true;
    }
    return false;
  };

  const validatePhoneNumber = (phoneNumber) => {
    if (
      !/[0-9]/.test(phoneNumber) ||
      phoneNumber.length > 9 ||
      phoneNumber.length < 9
    ) {
      return false;
    }
    return true;
  };

  if (!sessionStorage.getItem("token")) {
    return <Navigate to={"/"} />;
  }

  if (loading == true) {
    return <h1>Loading...</h1>;
  } else {
    return (
      <div className="container">
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
        <NavMenu profile = "fs-3 text-dark text fw-bolder font-weight-bold"/>
        <div
          className="d-flex flex-column bg-light border rounded overflow-auto"
          style={{ height: "640px" }}
        >
          <div className="text-center">
            <AccountBoxIcon
              style={{ transform: "scale(2.8)" }}
              className="mt-4"
            />
          </div>
          <div className=" row mt-5 mx-lg-5">
            <div className="col-1"></div>
            <div className="col-lg-3 mx-lg-5">
              <h5>First Name</h5>
              <input
                name="firstName"
                class="form-control"
                placeholder={user.firstName}
                aria-describedby="firstNameHelp"
                onChange={handleChange}
              />
              <span id="firstNameHelp" class="form-text">
                Must be atleast 3 characters long.
              </span>
            </div>
            <div className="col-lg-3"></div>
            <div className="col-lg-3">
              <h5>Second Name</h5>
              <input
                name="secondName"
                class="form-control"
                placeholder={user.secondName}
                aria-describedby="secondNameHelp"
                onChange={handleChange}
              />
              <span id="secondNameHelp" class="form-text">
                Must be atleast 3 characters long.
              </span>
            </div>
          </div>
          <div className=" row mt-4 mx-lg-5 ">
            <div className="col-lg-1"></div>
            <div className="col-lg-3 mx-lg-5">
              <h5>Email</h5>
              <input
                name="email"
                class="form-control"
                placeholder={user.email}
                aria-describedby="emailHelp"
                onChange={handleChange}
              />
              <span id="emailHelp" class="form-text">
                Must be an email.
              </span>
            </div>
            <div className="col-lg-3 text-center "></div>
            <div className="col-lg-3">
              <h5>Password</h5>
              <input
                name="password"
                type="password"
                class="form-control"
                aria-describedby="pwdNameHelp"
                onChange={handleChange}
              />
              <span id="pwdNameHelp" class="form-text">
                Must be atleast 8 characters long.
              </span>
            </div>
          </div>
          <div className=" row mt-4 mx-lg-5 ">
            <div className="col-lg-1"></div>
            <div className="col-lg-3 mx-lg-5">
              <h5>Phone Number</h5>
              <input
                name="phoneNumber"
                class="form-control"
                placeholder={user.phoneNumber}
                aria-describedby="phoneNumberHelp"
                onChange={handleChange}
              />
              <span id="phoneNumberHelp" class="form-text">
                Must be 9 numbers.
              </span>
            </div>
            <div className="col-lg-3"></div>
            <div className="col-lg-3">
              <h5>Retype Password</h5>
              <input
                name="password2"
                type="password"
                class="form-control"
                aria-describedby="pwdNameHelp2"
                onChange={handleChange}
              />
              <span id="pwdNameHelp2" class="form-text">
                Passwords must be the same.
              </span>
            </div>
          </div>
          <div className="mx-auto mb-lg-5 mt-lg-auto">
            <a
              style={{ textDecoration: "none" }}
              href="#"
              className="card-linkbtn border btn-lh btn-primary"
              onClick={sendUpdateUserRequest}
            >
              Update Profile
            </a>
          </div>
        </div>
      </div>
    );
  }
};
export default Profile;
