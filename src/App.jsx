import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeLayout from "./Public/Layout/HomeLayout";
import Dashboard from "./Admin/Dashboard/Dashboard";
import HeroSection from "./Admin/Components/HeroSection";
import Settings from "./Admin/Components/Settings";

const App = () => {
  return (
    <Router>
      {/* Routes */}
      <Routes>
        {/* Public route */}
        <Route path="/" element={<HomeLayout />} />

        {/* Admin routes */}
        <Route path="/admin" element={<Dashboard />}>
          {/* children route */}
          <Route path="hero-section" element={<HeroSection />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>

    </Router>
  );
};

export default App;
