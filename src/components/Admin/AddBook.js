import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { PostData } from "../../services/PostData";
import { GetData } from "../../services/GetData";
import { AdminNavMenu } from "./AdminNavMenu";
import { ToastContainer } from "react-toastify";
import { notifyError, notifyWarn, notifySucc } from "../../util/Toasts";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";

const AddBook = () => {
  //address should be passed to PostData (fetch)
  const [book, setBook] = useState({
    name: "",
    author: "",
    description: "",
    categoryId: "",
    publishYear: "",
  });
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState({
    name: "Select category",
  });
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const token = JSON.parse(sessionStorage.getItem("token"));
    GetData("api/category/read.php", token)
      .then((response) => {
        setCategories(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setBook((values) => ({ ...values, [name]: value }));
    console.log(book);
  };

  const handleCategoryChange = (event) => {
    const id = event.target.name;
    setBook((values) => ({ ...values, categoryId: id }));
    //find array id of chosen category id
    let arrayId = 0;
    for (const [key, value] of Object.entries(categories)) {
      if (value.id == id) break;
      arrayId += 1;
    }
    setSelectedCategory(categories[arrayId]);
    console.log(categories[arrayId]);
  };

  const sendAddBookRequest = () => {
    const token = JSON.parse(sessionStorage.getItem("token"));
    PostData("api/admin/book/add.php", book, token).then((response) => {
      if (response.success === 1) {
        notifySucc("Book added successfully");
        setSuccess(true);
      } else {
        notifyError(response.message);
      }
    });
  };

  if (
    sessionStorage.getItem("role") !== "admin" ||
    !sessionStorage.getItem("token")
  ) {
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
      <AdminNavMenu addbook="fs-3 text-dark text fw-bolder font-weight-bold" />
      <div
        className="d-flex flex-column bg-light border rounded overflow-auto"
        style={{ height: "600px" }}
      >
        <div className="text-center mb-lg-3 mt-1">
          <BookmarkAddIcon
            style={{ transform: "scale(2.8)" }}
            className="mt-4"
          />
        </div>
        <div className=" row mt-sm-4 mx-lg-5">
          <div className="col-lg-1"></div>
          <div className="col-lg-3 mx-lg-5">
            <h5>Name</h5>
            <input name="name" class="form-control" onChange={handleChange} />
          </div>
          <div className="col-lg-3"></div>
          <div className="col-lg-3">
            <h5>Author</h5>
            <input name="author" class="form-control" onChange={handleChange} />
          </div>
        </div>
        <div className=" row mt-lg-5 mx-lg-5">
          <div className="col-lg-1"></div>
          <div className="col-lg-3 mx-lg-5">
            <h5>Publish year</h5>
            <input
              type="number"
              name="publishYear"
              class="form-control"
              onChange={handleChange}
            />
          </div>
          <div className="col-lg-3"></div>
          <div className="col-lg-3">
            <h5>Category</h5>
            <div className="dropdown ">
              <button
                className="btn mx-1 mb-3 border btn-lg dropdown-toggle"
                type="button"
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {selectedCategory.name}
              </button>
              <ul
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton1"
              >
                {categories?.map((category) => {
                  return (
                    <li>
                      <a
                        key={category.id}
                        name={category.id}
                        className="dropdown-item"
                        onClick={handleCategoryChange}
                      >
                        {category.name}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
        <div className=" row mt-sm-4 mx-lg-5">
          <div className="col-lg-1"></div>
          <div className="col-lg-3 mx-lg-5">
            <h5>Description</h5>
            <textarea
              class="form-control"
              id="exampleFormControlTextarea1"
              rows="4"
              name="description"
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="mx-auto mb-4 mt-auto">
          <a
            style={{ textDecoration: "none" }}
            className="card-linkbtn border btn-lh btn-success"
            href="#"
            onClick = {sendAddBookRequest}
          >
            Add book
          </a>
        </div>
      </div>
    </div>
  );
};
export default AddBook;
