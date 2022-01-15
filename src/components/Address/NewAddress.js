import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { PostData } from "../../services/PostData";
import { GetData } from "../../services/GetData";
import { NavMenu } from "../Home/NavMenu";
import { ToastContainer } from "react-toastify";
import { notifyError, notifyWarn, notifySucc } from "../../util/Toasts";
import HomeIcon from "@mui/icons-material/Home";

const NewAddress = () => {
  //address should be passed to PostData (fetch)
  const [address, setAddress] = useState({
    id: "",
    city: "",
    postCode: "",
    country: "Poland",
    street: "",
    buildingNumber: "",
  });
  const [change, setChange] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const token = JSON.parse(sessionStorage.getItem("token"));
    GetData("api/user-info.php", token)
      .then((response) => {})
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleChange = (event) => {
    if (change === false) {
      setChange(true);
    }
    const name = event.target.name;
    const value = event.target.value;
    setAddress((values) => ({ ...values, [name]: value }));
    console.log(address);
  };

  const sendAddAddressRequest = () => {
    if (change === false) {
      notifyWarn("Nothing to update");
    } else {
      let regexPostCode = /^[0-9]{5}$/;
      let regexBuildingNumber = /^[0-9]{1,4}[a-zA-Z]?$/;
      if (address.city.length < 3) notifyError("City is invalid");
      else if (
        address.postCode.length != 5 ||
        !regexPostCode.test(address.postCode)
      )
        notifyError("Post code is invalid");
      else if (address.country.length < 4) notifyError("Country is invalid");
      else if (address.street.length < 3) notifyError("Street name is invalid");
      else if (!regexBuildingNumber.test(address.buildingNumber))
        notifyError("Building number is invalid");
      else {
        const token = JSON.parse(sessionStorage.getItem("token"));
        PostData("api/address/add.php", address, token).then((result) => {
          let response = result;
          console.log(response);
          if (response.success === 1) {
            setSuccess(true);
          } else {
            notifyWarn(response.message);
          }
        });
      }
    }
  };

  if (success) {
    notifySucc("New address set!");
    return <Navigate to={"/address"} />;
  }

  if (!sessionStorage.getItem("token")) {
    console.log(sessionStorage.getItem("token"));
    return <Navigate to={"/"} />;
  }

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
      <NavMenu />
      <div
        className="d-flex flex-column bg-light border rounded overflow-auto"
        style={{ height: "590px" }}
      >
        <div className="text-center mb-lg-3 mt-1">
          <HomeIcon style={{ transform: "scale(2.8)" }} className="mt-4" />
        </div>
        <div className=" row mt-sm-4 mx-lg-5">
          <div className="col-lg-1"></div>
          <div className="col-lg-3 mx-lg-5">
            <h5>City</h5>
            <input
              name="city"
              class="form-control"
              placeholder={address.city}
              aria-describedby="cityNameHelp"
              onChange={handleChange}
            />
            <span id="cityNameHelp" class="form-text">
              Must be atleast 3 characters long.
            </span>
          </div>
          <div className="col-lg-3"></div>
          <div className="col-lg-3">
            <h5>Post Code</h5>
            <input
              name="postCode"
              class="form-control"
              placeholder={address.postCode}
              aria-describedby="postCodeHelp"
              onChange={handleChange}
            />
            <span id="postCodeHelp" class="form-text">
              Must have 5 digits.
            </span>
          </div>
        </div>
        <div className=" row mt-lg-5 mx-lg-5">
          <div className="col-lg-1"></div>
          <div className="col-lg-3 mx-lg-5">
            <h5>Street</h5>
            <input
              name="street"
              class="form-control"
              placeholder={address.street}
              aria-describedby="streetNameHelp"
              onChange={handleChange}
            />
            <span id="streetNameHelp" class="form-text">
              Must be atleast 3 characters long.
            </span>
          </div>
          <div className="col-lg-3"></div>
          <div className="col-lg-3">
            <h5>Building Number</h5>
            <input
              name="buildingNumber"
              class="form-control"
              placeholder={address.buildingNumber}
              aria-describedby="buildingNumberHelp"
              onChange={handleChange}
            />
            <span id="buildingNumberHelp" class="form-text">
              Must be an integer.
            </span>
          </div>
        </div>
        <div className=" row mt-lg-4 mx-lg-5">
          <div className="col-lg-1"></div>
          <div className="col-lg-3 mx-lg-5">
            <h4>Apartment</h4>
            <input
              name="apartment"
              class="form-control"
              placeholder={address.apartment}
              aria-describedby="streetNameHelp"
              onChange={handleChange}
            />
            <span id="streetNameHelp" class="form-text">
              Must be an integer.
            </span>
          </div>
        </div>
        <div className="mx-auto mb-5 mt-auto">
          <a
            style={{ textDecoration: "none" }}
            className="card-linkbtn border btn-lh btn-success"
            onClick={sendAddAddressRequest}
            href="#"
          >
            Add Address
          </a>
        </div>
      </div>
    </div>
  );
};
export default NewAddress;
