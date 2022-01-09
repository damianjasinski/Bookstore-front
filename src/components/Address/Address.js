import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { GetData } from "../../services/GetData";
import { PostData } from "../../services/PostData";
import { NavMenu } from "../Home/NavMenu";
import { ToastContainer } from "react-toastify";
import { notifyError, notifyWarn, notifySucc } from "../../util/Toasts"
import HomeIcon from '@mui/icons-material/Home';


const Profile = () => {

  //inputs should be passed to PostData (fetch)
  const [inputs, setInputs] = useState({ "id": "", "city": "", "postCode": "", "country": "", "street": "", "buildingNumber": "" });
  //store current user data
  const [address, setAddress] = useState([]);
  const [change, setChange] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedAddress, setSelectedAddress] = useState(0);

  useEffect(() => {
    const token = JSON.parse(sessionStorage.getItem("token"));
    GetData("api/address/read.php", token)
      .then((response) => {
        if (address.length == 0) {
          setAddress(response.data);
        }
        if (address.length !== 0)
         for (const [key, value] of Object.entries(address[selectedAddress])) {
           setInputs((values) => ({ ...values, [key]: value }));
         }
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [loading]);

  sessionStorage.setItem("address", JSON.stringify(address));

  const changeSelectedAddress = (id) => {
    setSelectedAddress(id);
  }

  const handleChange = (event) => {
    if (change === false) {
      setChange(true);
    }
    const name = event.target.name;
    const value = event.target.value;
  };


  if (!sessionStorage.getItem("token")) {
    console.log(sessionStorage.getItem("token"))
    return <Navigate to={"/"} />;
  }

  if (loading == true) {
    return (
      <h1>Loading...</h1>
    )
  }
  else {
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
        <div className="d-flex flex-column bg-light border rounded overflow-auto" style={{ height: "590px" }}>
          <div className="text-center">
            <HomeIcon style={{ transform: "scale(2.8)" }} className="mt-4" />
          </div>
          <div className="dropdown text-center mt-4">
            <button className="btn border btn-lg dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
              Select address
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
              {address.map((address) => {
                return (
                  <li><a key = {address.id} className="dropdown-item" href = "#">{address.city}, {address.street}, {address.buildingNumber}... </a></li>
                )
              })}
            </ul>
          </div>
          < div className=" row mt-sm-5 mx-lg-5">
            <div className="col-lg-1"></div>
            <div className="col-lg-3 mx-lg-5">
              <h5>City</h5>
              <input name="firstName" class="form-control" placeholder={inputs.city} aria-describedby="cityNameHelp" onChange={handleChange} />
              <span id="cityNameHelp" class="form-text">
                Must be atleast 3 characters long.
              </span>
            </div>
            <div className="col-lg-3">
            </div>
            <div className="col-lg-3">
              <h5>Post Code</h5>
              <input name="secondName" class="form-control" placeholder={inputs.postCode} aria-describedby="postCodeHelp" onChange={handleChange} />
              <span id="postCodeHelp" class="form-text">
                Must be in XX-XXX format.
              </span>
            </div>
          </div>
          <div className=" row mt-lg-5 mx-lg-5">
            <div className="col-lg-1"></div>
            <div className="col-lg-3 mx-lg-5">
              <h5>Street</h5>
              <input name="firstName" class="form-control" placeholder={inputs.street} aria-describedby="streetNameHelp" onChange={handleChange} />
              <span id="streetNameHelp" class="form-text">
                Must be atleast 3 characters long.
              </span>
            </div>
            <div className="col-lg-3">
            </div>
            <div className="col-lg-3">
              <h5>Building Number</h5>
              <input name="secondName" class="form-control" placeholder={inputs.buildingNumber} aria-describedby="buildingNumberHelp" onChange={handleChange} />
              <span id="buildingNumberHelp" class="form-text">
                Must be an integer.
              </span>
            </div>
          </div>
          <div className="mx-auto mb-6 mt-auto">
            <a style={{ textDecoration: "none" }} className="card-linkbtn border btn-lh btn-primary" >Update Address</a>
          </div>
        </div>
      </div>

    );
  }
}
export default Profile;
