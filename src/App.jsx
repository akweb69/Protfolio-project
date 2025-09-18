import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeLayout from "./Public/Layout/HomeLayout";
import Dashboard from "./Admin/Dashboard/Dashboard";
import HeroSection from "./Admin/Components/HeroSection";
import Settings from "./Admin/Components/Settings";
import HomePage from "./Public/Common/HomePage";
import AboutMe from "./Admin/Components/AboutMe";

const App = () => {
  return (
    <Router>
      {/* Routes */}
      <Routes>
        {/* Public route */}
        <Route path="/" element={<HomeLayout />}>
          {/* children routes */}
          <Route path="/" element={<HomePage></HomePage>} />

        </Route>

        {/* Admin routes */}
        <Route path="/admin" element={<Dashboard />}>
          {/* children route */}
          <Route path="hero-section" element={<HeroSection />} />
          <Route path="about-me" element={<AboutMe />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>

    </Router>
  );
};

export default App;
