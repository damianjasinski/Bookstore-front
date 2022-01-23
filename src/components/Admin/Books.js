import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { GetData } from "../../services/GetData";
import { PostData } from "../../services/PostData";
import { notifyError, notifySucc } from "../../util/Toasts";
import { ToastContainer } from "react-toastify";
import { AdminNavMenu } from "./AdminNavMenu";

const Books = () => {
  const [books, setBooks] = useState([]);
  const [bookName, setBookName] = useState(" ");
  const [bookAuthor, setBookAuthor] = useState(0);
  const [bookId, setBookId] = useState(0);

  useEffect(() => {
    const token = JSON.parse(sessionStorage.getItem("token"));
    GetData("api/book/read.php", token)
      .then((response) => {
        console.log(response);
        setBooks(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const sendDeleteRequest = (event) => {
    const bookId = {"bookId" : event.target.name}
    const token = JSON.parse(sessionStorage.getItem("token"));
    PostData("api/admin/book/delete.php", bookId, token).then((response) => {
        if (response.message === 'Success') {
            notifySucc("Succesfully deleted book with id: " + event.target.name)
        }    
        else {
            notifyError(response.data);
        }
    });
  };
  
  if (sessionStorage.getItem("role") !== 'admin' || !sessionStorage.getItem("token") ) {
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
      <AdminNavMenu books="fs-3 text-dark text fw-bolder font-weight-bold" />
      <div
        className="bg-light border rounded overflow-auto"
        style={{ height: "720px" }}
      >
        <div className="row overflow-auto mx-4 p-2 my-3 ">
          {books.map((book) => {
            if (book.available == true)
              return (
                <div
                  key={book.id}
                  className="card mb-2 mx-auto border border-secondary overflow-auto"
                  style={{ width: "22em" }}
                >
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{book.name}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">
                      {book.author}
                    </h6>
                    <p
                      className="card-text  overflow-auto"
                      style={{ height: "11em" }}
                    >
                      {book.description}
                    </p>
                    <div className="mt-auto mx-auto">
                      <a
                        name={book.id}
                        href="#"
                        style={{ textDecoration: "none" }}
                        onClick={sendDeleteRequest}
                        className="card-linkbtn border btn-lg btn-outline-primary"
                      >
                        Delete
                      </a>
                    </div>
                  </div>
                </div>
              );
            else
              return (
                <div
                  key={book.id}
                  className="card mb-2 mx-auto border border-secondary overflow-auto"
                  style={{ width: "22em" }}
                >
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{book.name}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">
                      {book.author}
                    </h6>
                    <p
                      className="card-text  overflow-auto"
                      style={{ height: "11em" }}
                    >
                      {book.description}
                    </p>
                    <div className="row">
                      <div className="mt-auto col-6">
                        <a
                          style={{ textDecoration: "none" }}
                          name={book.id}
                          href="#"
                          className="disabled card-linkbtn border btn-lg btn-outline-primary"
                          onClick={sendDeleteRequest}
                        >
                          Delete
                        </a>
                      </div>
                      <div className="col-6">
                        <h6>Out of stock</h6>
                      </div>
                    </div>
                  </div>
                </div>
              );
          })}
        </div>
      </div>
    </div>
  );
};

export default Books;
