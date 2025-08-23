import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Home/Navbar";
import EnhancedCarousel from "./Home/Carousel";
import Girlpage from "./Home/Girlpage";
import AllSlider from "./Home/AllSlider";
import Tenant from "./Home/Tenant";
import Subscription from "./Home/Subscription";
import Footer from "./Home/Footer";
import ContactPage from "./Contact/Contact";
import FeaturesPage from "./Features/Homepage";
import AboutUs from "./About/About";
import Findpage from "./Find/Header";
import GetApp from "./GetApp/GetApp";
import Details from "./Find/Details";

const Home = () => (
  <>
    <EnhancedCarousel />
    <Girlpage />
    <div className="main-content">
      <AllSlider />
      <Tenant />
      <Subscription />
      <Footer />
    </div>
  </>
);

const App = () => {
  return (
    <Router>
      <div className="relative">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/find" element={<Findpage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/features" element={<FeaturesPage />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/GetApp" element={<GetApp />} />
          <Route path="/room/details" element={<Details />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
