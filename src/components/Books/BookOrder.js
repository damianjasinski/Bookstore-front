import React from "react";
import BookIco from "@mui/icons-material/LocalLibraryOutlined";
import { notifyError, notifyWarn, notifySucc } from "../../util/Toasts";
import { PostData } from "../../services/PostData";
import { ToastContainer } from "react-toastify";

export const BookOrder = (props) => {

  const sendAddOrderRequest = () => {
    const token = JSON.parse(sessionStorage.getItem("token"));
    const bookId = {"bookId" : props.bookId};
    PostData("api/order/add.php", bookId, token).then((result) => {
      let response = result;
      console.log(response)
      if (response.success === 1) {
        notifySucc("Book ordered successfully");
      } else {
        notifyWarn(response.message);
      }
    });
  };

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
              <h5 className="modal-title " id="staticBackdropLabel">
                {props.bookName},
              </h5>
              <h5 className=" modal-title text-muted">
                &nbsp;&nbsp;&nbsp;{props.bookAuthor}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <h5>Are you sure you want to order this book?</h5>
              <p className="text-muted">
                After clicking yes, head to the Orders section to finalize your
                order.
              </p>
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
                No
              </button>
              <button
                onClick={sendAddOrderRequest}
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
              >
                Yes, Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookOrder;
