import React, { useState } from "react";
import BookIco from "@mui/icons-material/LocalLibraryOutlined";
import { notifyError, notifyWarn, notifySucc } from "../../util/Toasts";
import { PostData } from "../../services/PostData";
import { ToastContainer } from "react-toastify";

export const Pay = (props) => {

  const [selectedAddress, setSelectedAdress] = useState({
    city: "Select Address",
  })

  const setAddrex = (event) => {
    const addrId = event.target.name;
    //find array id of chosen address id
    let arrayId = 0;
    for (const [key, value] of Object.entries(props.addresses)) {
      if (value.id == addrId) break;
      arrayId += 1;
    }
    setSelectedAdress(props.addresses[arrayId])
    console.log(arrayId)
  }

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
                  {selectedAddress.city} {selectedAddress.postCode} {selectedAddress.street} {selectedAddress.buildingNumber}
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
                          onClick = {setAddrex}
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
                <BookIco fontSize="large" style={{ transform: "scale(1.3)" }} />
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
};



export default Pay;
