import React, { Component } from "react";
// import "./styles/foundation.min.css";
// import "./styles/custom.css";
import "./styles/bootstrap-5.1.3-dist/css/bootstrap.min.css";
import { PostData } from "./services/PostData";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Reroute from "./routes";



function App() {
  return (
    <div>
      <Header />
      <Reroute />
      <Footer />
    </div>
  );
}

export default App;
