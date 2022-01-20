import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { PostData } from "../../services/PostData";
import { NavMenu } from "../Home/NavMenu";
import SearchIcon from "@mui/icons-material/Search";
import { ToastContainer } from "react-toastify";
import { notifySucc, notifyWarn } from "../../util/Toasts";

const Search = () => {
  const [books, setBooks] = useState([]);
  const [isModal, setModal] = useState(false);
  const [bookName, setBookName] = useState(" ");
  const [bookAuthor, setBookAuthor] = useState(0);
  const [searchPhrase, setSearchPhrase] = useState([]);
  const [bookId, setBookId] = useState(0);
  const [change, setChange] = useState(false);

  if (!sessionStorage.getItem("token")) {
    return <Navigate to={"/"} />;
  }

  const handleChange = (event) => {
    if (change === false) {
      setChange(true);
    }
    const name = event.target.name;
    const value = event.target.value;
    setSearchPhrase((values) => ({ ...values, [name]: value }));
  };

  const showModal = (event) => {
    const bookIdx = event.target.name;
    //find array id of chosen book id
    let arrayId = 0;
    for (const [key, value] of Object.entries(books)) {
      if (value.id == bookIdx) break;
      arrayId += 1;
    }
    setBookId(bookIdx);
    setBookAuthor(books[arrayId].author);
    setBookName(books[arrayId].name);
  };

  const sendSearchRequest = () => {
    if (change === false) {
      notifyWarn("Enter book name phrase");
    } else if (searchPhrase.length < 2) {
      notifyWarn("Need atleast 2 letters to search");
    } else {
      var searchVal = "%";
      searchVal = searchVal.concat(searchPhrase["searchPhrase"]);
      searchVal = searchVal.concat("%");
      searchVal = {"searchPhrase" : searchVal};
      console.log(searchVal)
      const token = JSON.parse(sessionStorage.getItem("token"));
      PostData("api/book/search.php", searchVal, token).then((result) => {
        console.log(result);
        if (result.success === 1) {
          setBooks(result.data);
        } else {
          notifyWarn(result.message);
        }
      });
    }
  };

  return (
    <div className="container" >
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
      <NavMenu search="fs-3 text-dark text fw-bolder font-weight-bold" />
      <div
        className="bg-light border rounded overflow-auto"
        style={{ height: "700px" }}
      >
        <div className="row overflow-auto mt-4">
          <div className="col-lg-2"></div>
          <div className="col-lg-7 mt-3">
            <input
              name="searchPhrase"
              class="form-control"
              aria-describedby="cityNameHelp"
              onChange={handleChange}
            />
            <span id="cityNameHelp" class="form-text">
              Must be atleast 3 characters long.
            </span>
          </div>
          <div className="col-lg-3 mt-2 mb-6">
            <button
              className="btn btn-lg btn-outline-primary"
              onClick={sendSearchRequest}
            >
              <SearchIcon style={{ transform: "scale(1.4)" }} />
              Search
            </button>
          </div>
        </div>
        <div className="row overflow-auto mx-4 p-2 my-3 ">
          {books?.map((book) => {
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
                      style={{ height: "9em" }}
                    >
                      {book.description}
                    </p>
                    <div className="mt-auto mx-auto">
                      <a
                        name={book.id}
                        style={{ textDecoration: "none" }}
                        data-bs-toggle="modal"
                        data-bs-target="#staticBackdrop"
                        href="#"
                        onClick={showModal}
                        className="card-linkbtn border btn-lg btn-outline-primary"
                      >
                        Order
                      </a>
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

export default Search;
