import { Tune } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { GetData } from "../../services/GetData";
import { PostData } from "../../services/PostData";
import { NavMenu } from "../Home/NavMenu";

const Profile = () => {

  //inputs should be passed to PostData (fetch)
  const [inputs, setInputs] = useState({ "userId": "", "password": "", "password2": "", "email": "", "phoneNumber": "", "firstName": "", "secondName": "" });
  //store current user data
  const [user, setUser] = useState({});
  const [change, setChange] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = JSON.parse(sessionStorage.getItem("token"));
    GetData("api/user-info.php", token)
      .then((response) => {
        setUser((response.user));
        for (const [key, value] of Object.entries(user)) {
          setInputs((values) => ({ ...values, [key]: value }));
        }
        setLoading(false);
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

  const updateRequest = () => {
    if (change === false) {
      window.alert("Nothing to update")
    }
    else {
      if (inputs.firstName.length < 3)
        window.alert("Bad First Name format!");
      else if (inputs.secondName.length < 3)
        window.alert("Bad Second Name Format");
      else if (!validateEmail(inputs.email))
        window.alert("Bad email format");
      else if (!validatePhoneNumber(inputs.phoneNumber))
        window.alert("Phone number is invalid!")
      else if (inputs.password.length !== 0 && inputs.password.length < 8)
        window.alert("Password is too short!");
      else if (inputs.password != inputs.password2)
        window.alert("Password doesnt match!");
      else {
        console.log(inputs.password.length)
        console.log("all ok")
        const token = JSON.parse(sessionStorage.getItem("token"));
        PostData("api/profile/update.php", inputs, token).then((result) => {
          let response = result;
          if (response.success === 1) {
            window.alert("Update Complete");
            setLoading(true);
          } else {
            window.alert(response.message);
          }
        });
      }
    }
  };

  const validateEmail = (email) => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      return (true)
    }
    return false;
  };

  const validatePhoneNumber = (phoneNumber) => {
    if (!/[0-9]/.test(phoneNumber) || phoneNumber.length > 9 || phoneNumber.length < 9 ) {
      return false;
    }
    return true;
  }

  if (!sessionStorage.getItem("token")) {
    return <Navigate to={"/"} />;
  }


  console.log(inputs);
  return (
    <div className="container">
      <NavMenu />
      <div className="d-flex flex-column bg-light border rounded overflow-auto" style={{ height: "590px" }}>
        <div className=" row mt-5 mx-5">
          <div className="col-1"></div>
          <div className="col-3 mx-4">
            <h5>First Name</h5>
            <input name="firstName" class="form-control" placeholder={user.firstName} aria-describedby="firstNameHelp" onChange={handleChange} />
            <span id="firstNameHelp" class="form-text">
              Must be atleast 3 characters long.
            </span>
          </div>
          <div className="col-3">
          </div>
          <div className="col-3">
            <h5>Second Name</h5>
            <input name="secondName" class="form-control" placeholder={user.secondName} aria-describedby="secondNameHelp" onChange={handleChange} />
            <span id="secondNameHelp" class="form-text">
              Must be atleast 3 characters long.
            </span>
          </div>
        </div>
        <div className=" row mt-4 mx-5 ">
          <div className="col-1"></div>
          <div className="col-3 mx-4">
            <h5>Email</h5>
            <input name="email" class="form-control" placeholder={user.email} aria-describedby="emailHelp" onChange={handleChange} />
            <span id="emailHelp" class="form-text">
              Must be an email.
            </span>
          </div>
          <div className="col-3">
          </div>
          <div className="col-3">
            <h5>Password</h5>
            <input name="password" type="password" class="form-control" aria-describedby="pwdNameHelp" onChange={handleChange} />
            <span id="pwdNameHelp" class="form-text">
              Must be atleast 8 characters long.
            </span>
          </div>
        </div>
        <div className=" row mt-4 mx-5 ">
          <div className="col-1"></div>
          <div className="col-3 mx-4">
            <h5>Phone Number</h5>
            <input name="phoneNumber" class="form-control" placeholder={user.phoneNumber} aria-describedby="phoneNumberHelp" onChange={handleChange} />
            <span id="phoneNumberHelp" class="form-text">
              Must be 9 numbers.
            </span>
          </div>
          <div className="col-3">
          </div>
          <div className="col-3">
            <h5>Retype Password</h5>
            <input name="password2" type="password" class="form-control" aria-describedby="pwdNameHelp2" onChange={handleChange} />
            <span id="pwdNameHelp2" class="form-text">
              Passwords must be the same.
            </span>
          </div>
        </div>
        <div className="mx-auto mb-6 mt-auto">
          <a style={{ textDecoration: "none" }} href="#" className="card-linkbtn border btn-lh btn-primary" onClick={updateRequest}>Update Profile</a>
        </div>
      </div>
    </div>

  );
}
export default Profile;
