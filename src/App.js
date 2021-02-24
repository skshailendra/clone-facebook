import React from "react";
import "./App.scss";
import Navbar from "./components/Navigation/Navbar/Navbar";
import Layout from "./Layout/Layout";

import SideNavigation from "./components/Navigation/SideNavigation/SideNavigation";
import RightSideNavidation from "./components/Navigation/RightSideNavigation/RightSideNavigation";
import Complementary from "./components/Complementary/Complementary";
import MainContent from "./components/MainContent/MainContent";
function App() {
  return (
    <div className="App">
      <Navbar />
      <Layout>
        <SideNavigation />
        <MainContent />
        <RightSideNavidation />
        {/* <Complementary /> */}
      </Layout>
    </div>
  );
}

export default App;
