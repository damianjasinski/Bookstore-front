import React, { useState } from "react";
import BookIco from "@mui/icons-material/LocalLibraryOutlined";
import { PostData } from "../../services/PostData";
import { notifyWarn } from "../../util/Toasts";
import { ToastContainer } from "react-toastify";
import { Navigate } from "react-router-dom";

export const Pay = (props) => {
  const [selectedAddress, setSelectedAdress] = useState({
    city: "Select Address",
  });

  const setAddres = (event) => {
    const addrId = event.target.name;
    //find array id of chosen address id
    let arrayId = 0;
    for (const [key, value] of Object.entries(props.addresses)) {
      if (value.id == addrId) break;
      arrayId += 1;
    }
    setSelectedAdress(props.addresses[arrayId]);
  };

  const sendPayRequest = () => {
    if (selectedAddress.city === "Select Address") {
      notifyWarn("Select address!");
    } else {
      const token = JSON.parse(sessionStorage.getItem("token"));
      var dataArr = {"orderId" : props.orderId, "ammount" : "8.99", "addressId" : selectedAddress.id};
      console.log(dataArr)
      PostData("api/payment/add.php", dataArr, token).then((response) => {
      });
      window.location.reload(false);
    }
  };

  if (props.addresses === undefined || props.addresses.length === 0) {
    return (
      <div>
        <div
          className="modal fade mt-center "
          id="staticBackdrop"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabindex="-1"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title fs-5" id="staticBackdropLabel">
                  Please update your address
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <p className="text-muted fs-5">
                  You first need to update your address
                </p>
              </div>
              <div className="modal-footer">
                <div className="col-10">
                  <BookIco
                    fontSize="large"
                    style={{ transform: "scale(1.3)" }}
                  />
                </div>
                <a type="button" className="btn btn-primary" href="/newAddress">
                  Ok
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else if (props.user === null) {
    return (
      <div>
        <div
          className="modal fade mt-center "
          id="staticBackdrop"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabindex="-1"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title fs-5" id="staticBackdropLabel">
                  Please update your profile
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <p className="text-muted fs-5">
                  You first need to update your profile
                </p>
              </div>
              <div className="modal-footer">
                <div className="col-10">
                  <BookIco
                    fontSize="large"
                    style={{ transform: "scale(1.3)" }}
                  />
                </div>
                <a type="button" className="btn btn-primary" href="/profile">
                  Ok
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div>
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
        <div
          className="modal fade mt-center "
          id="staticBackdrop"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabindex="-1"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title fs-5-6" id="staticBackdropLabel">
                  Select delivery address and pay to finalize order
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div className="dropdown ">
                  <button
                    className="btn mx-1 mb-3 border btn-lg dropdown-toggle"
                    type="button"
                    id="dropdownMenuButton1"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {selectedAddress.city} {selectedAddress.postCode}{" "}
                    {selectedAddress.street} {selectedAddress.buildingNumber}
                  </button>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenuButton1"
                  >
                    {props.addresses?.map((addr) => {
                      return (
                        <li>
                          <a
                            key={addr.id}
                            name={addr.id}
                            className="dropdown-item"
                            onClick={setAddres}
                            href="#"
                          >
                            {addr.city}, {addr.postCode}, {addr.street},{" "}
                            {addr.buildingNumber}
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </div>
                <p className="text-muted">Your card will be charged 8.99 PLN</p>
              </div>
              <div className="modal-footer">
                <div className="col-7">
                  <BookIco
                    fontSize="large"
                    style={{ transform: "scale(1.3)" }}
                  />
                </div>
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={sendPayRequest}
                  data-bs-dismiss="modal"
                >
                  Finalize
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Pay;
