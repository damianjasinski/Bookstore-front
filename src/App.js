import React from "react";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Reroute from "./routes";
// import "./styles/foundation.min.css";
// import "./styles/custom.css";
import "./styles/bootstrap-5.1.3-dist/css/bootstrap.min.css";



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
