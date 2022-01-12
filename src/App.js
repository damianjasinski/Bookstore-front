import React from "react";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
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
