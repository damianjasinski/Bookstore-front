import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { GetData } from "../../services/GetData";
import { PostData } from "../../services/PostData";
import { NavMenu } from "../Home/NavMenu";
import { ToastContainer } from "react-toastify";
import { notifyError, notifyWarn, notifySucc } from "../../util/Toasts";
import HomeIcon from "@mui/icons-material/Home";

const Address = () => {
  //inputs should be passed to PostData (fetch)
  const [inputs, setInputs] = useState({
    id: "",
    city: "",
    postCode: "",
    country: "",
    street: "",
    buildingNumber: "",
  });
  //store current user data
  const [address, setAddress] = useState([]);
  const [change, setChange] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = JSON.parse(sessionStorage.getItem("token"));
    GetData("api/address/read.php", token)
      .then((response) => {
        if (response.data === undefined) setAddress(null);
        else {
          sessionStorage.setItem("address", JSON.stringify(address));
          setAddress(response.data);
        }
        if (address !== null && address?.length > 0) {
          for (const [key, value] of Object.entries(address[selectedAddress])) {
            setInputs((values) => ({ ...values, [key]: value }));
          }
        }
        setLoading(false);
        console.log(JSON.parse(sessionStorage.getItem("address")));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [loading]);

  const handleDropdownChange = (event) => {
    const addrId = event.target.name;
    //find array id of chosen address id
    let arrayId = 0;
    for (const [key, value] of Object.entries(address)) {
      if (value.id == addrId) break;
      arrayId += 1;
    }
    for (const [key, value] of Object.entries(address[arrayId])) {
      setInputs((values) => ({ ...values, [key]: value }));
    }
  };

  const handleChange = (event) => {
    if (change === false) {
      setChange(true);
    }
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
    console.log(inputs);
  };

  const sendUpdateRequest = () => {
    if (change === false) {
      notifyWarn("Nothing to update");
    }
    else {
      const token = JSON.parse(sessionStorage.getItem("token"));
      PostData("api/address/update.php", inputs, token).then((result) => {
        console.log(inputs);
        let response = result;
        if (response.success === 1) {
          notifySucc("Addres update success");
        } else {
          notifyError(response.message);
        }
      });
    }
  };

  if (!sessionStorage.getItem("token")) {
    console.log(sessionStorage.getItem("token"));
    return <Navigate to={"/"} />;
  }
  if (address == null) {
    return <Navigate to={"/newaddress"} />;
  } else
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
        <NavMenu address = "fs-3 text-dark text fw-bolder font-weight-bold" />
        <div
          className="d-flex flex-column bg-light border rounded overflow-auto"
          style={{ height: "640px" }}
        >
          <div className="text-center ">
            <HomeIcon style={{ transform: "scale(2.8)" }} className="mt-4" />
          </div>
          <div className="dropdown text-center mt-4">
            <button
              className="btn border btn-lg dropdown-toggle"
              type="button"
              id="dropdownMenuButton1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Select address
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
              {address?.map((addr) => {
                return (
                  <li>
                    <a
                      key={addr.id}
                      name={addr.id}
                      className="dropdown-item"
                      href="#"
                      onClick={handleDropdownChange}
                    >
                      {addr.city}, {addr.street}, {addr.buildingNumber}
                      ...{" "}
                    </a>
                  </li>
                );
              })}
              <li>
                <a
                  key="newAddress"
                  name="newAddress"
                  className="dropdown-item"
                  href="/newAddress"
                >
                  Add new...
                </a>{" "}
              </li>
            </ul>
          </div>
          <div className=" row mt-sm-5 mx-lg-5">
            <div className="col-lg-1"></div>
            <div className="col-lg-3 mx-lg-5">
              <h4>City</h4>
              <input
                name="city"
                class="form-control"
                placeholder={inputs.city}
                aria-describedby="cityNameHelp"
                onChange={handleChange}
              />
              <span id="cityNameHelp" class="form-text">
                Must be atleast 3 characters long.
              </span>
            </div>
            <div className="col-lg-3"></div>
            <div className="col-lg-3">
              <h4>Post Code</h4>
              <input
                name="postCode"
                class="form-control"
                placeholder={inputs.postCode}
                aria-describedby="postCodeHelp"
                onChange={handleChange}
              />
              <span id="postCodeHelp" class="form-text">
                Must be in XX-XXX format.
              </span>
            </div>
          </div>
          <div className=" row mt-lg-5 mx-lg-5">
            <div className="col-lg-1"></div>
            <div className="col-lg-3 mx-lg-5">
              <h4>Street</h4>
              <input
                name="street"
                class="form-control"
                placeholder={inputs.street}
                aria-describedby="streetNameHelp"
                onChange={handleChange}
              />
              <span id="streetNameHelp" class="form-text">
                Must be atleast 3 characters long.
              </span>
            </div>
            <div className="col-lg-3"></div>
            <div className="col-lg-3">
              <h4>Building Number</h4>
              <input
                name="buildingNumber"
                class="form-control"
                placeholder={inputs.buildingNumber}
                aria-describedby="buildingNumberHelp"
                onChange={handleChange}
              />
              <span id="buildingNumberHelp" class="form-text">
                Must be an integer.
              </span>
            </div>
          </div>
          <div className="mx-auto mb-6 mt-auto">
            <a
              type="button"
              style={{ textDecoration: "none" }}
              className="card-linkbtn border btn-lh btn-primary"
              onClick={sendUpdateRequest}
            >
              Update Address
            </a>
          </div>
        </div>
      </div>
    );
};
export default Address;
