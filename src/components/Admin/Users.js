import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { GetData } from "../../services/GetData";
import { PostData } from "../../services/PostData";
import { AdminNavMenu } from "./AdminNavMenu";

const Users = () => {
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [users, setUsers] = useState([]);
  const [userId, setUserId] = useState(0);
  const [selectedUser, setSelectedUser] = useState([]);

  useEffect(() => {
    const token = JSON.parse(sessionStorage.getItem("token"));
    GetData("api/admin/users/read.php", token)
      .then((response) => {
        console.log(response.data);
        setUsers(response.data);
        setFilteredUsers(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleChange = (event) => {
    const value = event.target.value;
    if (value.length === 0) {
      setFilteredUsers(users);
    } else {
      setFilteredUsers(users.filter((user) => user.secondName === value));
    }
  };

  
  if (
    sessionStorage.getItem("role") !== "admin" ||
    !sessionStorage.getItem("token")
  ) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="container">
      <AdminNavMenu users="fs-3 text-dark text fw-bolder font-weight-bold" />
      <div
        className="bg-light border rounded overflow-auto"
        style={{ height: "720px" }}
      >
        <div className="row">
          <div className="col-lg-2 mx-4"></div>
          <div className="col-lg-7 mt-3 text-center">
            <input
              name="secondName"
              class="form-control"
              aria-describedby="cityNameHelp"
              onChange={handleChange}
            />
            <span id="cityNameHelp" class="form-text">
              Type second name to search
            </span>
          </div>
        </div>
        <div className="row overflow-auto mx-5 p-2 my-3 ">
          {filteredUsers?.map((user) => {
            return (
              <div className="row mt-2">
                <div className="text col-lg-10">
                  <h6 className="fs-5-6">
                    First Name: &nbsp; &nbsp;{user.firstName}
                  </h6>
                  <h6 className="fs-5-6">
                    Second Name: &nbsp; &nbsp;{user.secondName}
                  </h6>
                  <h6 className="fs-5-6">Email: &nbsp; &nbsp;{user.email}</h6>
                  <h6 className="fs-5-6">Role: &nbsp; &nbsp;{user.role}</h6>
                  <h6 className="fs-5-6">
                    Phone Number: &nbsp; &nbsp;{user.phoneNumber}
                  </h6>
                  <h6 className="fs-5-6">
                    Created date: &nbsp; &nbsp;{user.createdAt}
                  </h6>
                </div>
                <div className="col-lg-2 mt-3"></div>
                <hr />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Users;
