import { NavMenu } from "../Home/NavMenu";
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { GetData } from "../../services/GetData";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = JSON.parse(sessionStorage.getItem("token"));
    GetData("api/order/read.php", token)
      .then((response) => {
        console.log(response);
        setOrders(response.data);
        setLoading(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (!sessionStorage.getItem("token")) {
    return <Navigate to={"/"} />;
  }
  console.log(orders);

  return (
    <div className="container">
      <NavMenu orders = "fs-3 text-dark text fw-bolder font-weight-bold"/>
      <div
        className="d-flex flex-column bg-light border rounded overflow-auto"
        style={{ height: "590px" }}
      >
        <div className="mx-5 my-4 ">
          {orders?.map((order) => {
            if (order.finalized == 0) {
              return (
                <div className="row">
                  <div className="text col-lg-10">
                    <h5>Order of book: &nbsp; &nbsp;{order.name}</h5>
                    <h5>Ordered at date: &nbsp; &nbsp;{order.createdAt}</h5>
                    <h5>
                      Expiration date: &nbsp; &nbsp;{order.expirationDate}
                    </h5>
                    <h5>Finalized: &nbsp; &nbsp;No</h5>
                  </div>
                  <div className="col-lg-2 mt-5">
                    <a
                      style={{ textDecoration: "none" }}
                      className="button btn-lg btn-primary"
                    >
                      Pay
                    </a>
                  </div>
                  <hr />
                </div>
              );
            } else {
              return (
                <div className="row">
                  <div className="text col-lg-10">
                    <h5>Order of book: &nbsp; &nbsp;{order.name}</h5>
                    <h5>Ordered at date: &nbsp; &nbsp;{order.createdAt}</h5>
                    <h5>
                      Expiration date: &nbsp; &nbsp;{order.expirationDate}
                    </h5>
                    <h5>Finalized: &nbsp; &nbsp;Yes</h5>
                  </div>
                  <div className="col-lg-2 mt-5">
                    <a
                      style={{ textDecoration: "none" }}
                      className="button btn-lg btn-primary"
                    >
                      Pay
                    </a>
                  </div>
                  <hr />
                </div>
              );
            }
          })}
        </div>
        <div className="mx-auto mb-6 mt-auto"></div>
      </div>
    </div>
  );
};

export default Orders;
