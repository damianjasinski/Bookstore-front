import { NavMenu } from "../Home/NavMenu";
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { GetData } from "../../services/GetData";
import EventNoteIcon from "@mui/icons-material/EventNote";
import { Pay } from "./Pay";
import { notifySucc } from "../../util/Toasts";
import { ToastContainer } from "react-toastify";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [loading3, setLoading3] = useState(false);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [selectedFilterOption, setSelectedFilterOption] =
    useState("Filter orders");
  const [address, setAddress] = useState([]);
  const [user, setUser] = useState([])
  const [orderId, setOrderId] = useState(0)

  useEffect(() => {
    const token = JSON.parse(sessionStorage.getItem("token"));
    GetData("api/order/read.php", token)
      .then((response) => {
        setOrders(response.data);
        setFilteredOrders(orders);
        console.log(response.data)
        setLoading(true)
      })
      .catch((err) => {
        console.log(err);
      });
    GetData("api/user-info.php", token)
      .then((response) => {
        const user = sessionStorage.setItem("user", JSON.stringify(response.user));
        setUser(response.user);
        setLoading2(true)
      })
      .catch((err) => {
        console.log(err);
      });
    GetData("api/address/read.php", token)
      .then((response) => {
        sessionStorage.setItem("address", JSON.stringify(response.data));
        setAddress(response.data)
        setLoading3(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [loading]);

  const passDataToModal = (event) => {
    console.log(event.target.name)
    setOrderId(event.target.name)
  };

  const filterNotFinalized = () => {
    setFilteredOrders(orders.filter((order) => order.finalized == 0));
    setSelectedFilterOption("Not finalized");
  };

  const filterFinalized = () => {
    setFilteredOrders(orders.filter((order) => order.finalized == 1));
    setSelectedFilterOption("Finalized");
  };

  const filterExpired = () => {
    setFilteredOrders(orders.filter((order) => order.expired == 1));
    setSelectedFilterOption("Expired");
  };

  if (!sessionStorage.getItem("token")) {
    return <Navigate to={"/"} />;
  }
  if (sessionStorage.getItem("role") === "admin") {
    return <Navigate to = {"/adminbooks"} />
  }

  return (
    <div className="container">
    
      <Pay addresses={address} user = {user.phoneNumber} orderId = {orderId} />
      <NavMenu orders="fs-3 text-dark text fw-bolder font-weight-bold" />
      <div
        className="d-flex flex-column bg-light border rounded overflow-auto"
        style={{ height: "640px" }}
      >
        <div className="mx-5 my-2 ">
          <div className="text-center ">
            <EventNoteIcon
              style={{ transform: "scale(2.5)" }}
              className="mt-4"
            />
          </div>
          <div className="dropdown text-center mt-4">
            <button
              className="btn border btn-lg dropdown-toggle"
              type="button"
              id="dropdownMenuButton1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {selectedFilterOption}
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
              <li>
                <a
                  className="dropdown-item"
                  onClick={filterNotFinalized}
                  href="#"
                >
                  Not finalized
                </a>
              </li>
              <li>
                <a className="dropdown-item" onClick={filterFinalized} href="#">
                  Finalized
                </a>
              </li>
              <li>
                <a className="dropdown-item" onClick={filterExpired} href="#">
                  Expired
                </a>
              </li>
            </ul>
          </div>
          {filteredOrders?.map((order) => {
            if (order.finalized == 0)
              return (
                <div className="row mt-3">
                  <div className="text col-lg-10">
                    <h6 className="fs-5-6">
                      Order of book: &nbsp; &nbsp;{order.name}
                    </h6>
                    <h6 className="fs-5-6">
                      Ordered at date: &nbsp; &nbsp;{order.createdAt}
                    </h6>
                    <h6 className="fs-5-6">
                      Expiration date: &nbsp; &nbsp;{order.expirationDate}
                    </h6>
                  </div>
                  <div className="col-lg-2 mt-3">
                    <a
                      href="#"
                      data-bs-toggle="modal"
                      data-bs-target="#staticBackdrop"
                      style={{ textDecoration: "none" }}
                      className="button btn-lg btn-primary"
                      name = {order.orderId}
                      onClick={passDataToModal}
                    >
                      Pay
                    </a>
                  </div>
                  <hr />
                </div>
              );
            else
              return (
                <div className="row mt-3">
                  <div className="text col-lg-10">
                    <h6 className="fs-5-6">
                      Order of book: &nbsp; &nbsp;{order.name}
                    </h6>
                    <h6 className="fs-5-6">
                      Ordered at date: &nbsp; &nbsp;{order.createdAt}
                    </h6>
                    <h6 className="fs-5-6">
                      Expiration date: &nbsp; &nbsp;{order.expirationDate}
                    </h6>
                  </div>
                  <div className="col-lg-2 mt-3"></div>
                  <hr />
                </div>
              );
          })}
        </div>
        <div className="mx-auto mb-6 mt-auto"></div>
      </div>
    </div>
  );
};

export default Orders;
