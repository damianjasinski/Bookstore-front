import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { GetData } from "../../services/GetData";
import { NavMenu } from "../Home/NavMenu";

const Books = () => {
  const [books, setBooks] = useState([]);


  useEffect(() => {

    const token = JSON.parse(sessionStorage.getItem("token"));
    GetData("api/book/read.php", token)
      .then((response) => {
        console.log(response);
        setBooks((response.data));
      })
      .catch((err) => {
        console.log(err)
      });
  }, []);

  if (!sessionStorage.getItem("token")) {
    return <Navigate to={"/"} />;
  }


  console.log(books)
  return (
    <div className="container ">
      <NavMenu />

      <div className="bg-light border rounded overflow-auto" style={{ height: "590px" }}>
        <div className="row overflow-auto mx-4 p-2 my-3 ">
          {books.map((book) => {
            if (book.available == true) return (
              <div key={book.id} className="card mx-auto border border-secondary overflow-auto" style={{ width: "18em" }}>
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{book.name}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">{book.author}</h6>
                  <p className="card-text  overflow-auto" style={{ height: "8em" }} >{book.description}</p>
                  <div className="mt-auto mx-auto">
                    <a style={{ textDecoration: "none" }} href="#" className="card-linkbtn border btn-lg btn-outline-primary">Order</a>
                  </div>
                </div>
              </div>
            )
            else return (
              <div key={book.id} className="card mx-auto border border-secondary overflow-auto" style={{ width: "18em" }}>
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{book.name}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">{book.author}</h6>
                  <p className="card-text  overflow-auto" style={{ height: "8em" }} >{book.description}</p>
                  <div className="row">
                    <div className="mt-auto col-6">
                      <a style={{ textDecoration: "none" }} href="#" className="disabled card-linkbtn border btn-lg btn-outline-primary">Order</a>
                    </div>
                    <div className="col-6"><h6>Out of stock</h6></div>
                  </div>
                </div>
              </div>
            )
          }
          )}
        </div>
      </div>
    </div>
  );
};

export default Books;
