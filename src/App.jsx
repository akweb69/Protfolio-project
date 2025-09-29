import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeLayout from "./Public/Layout/HomeLayout";
import Dashboard from "./Admin/Dashboard/Dashboard";
import HeroSection from "./Admin/Components/HeroSection";
import Settings from "./Admin/Components/Settings";
import HomePage from "./Public/Common/HomePage";
import AboutMe from "./Admin/Components/AboutMe";
import Skills from "./Admin/Components/Skills";
import Educations from "./Admin/Components/Educations";
import Research_Publications from "./Admin/Components/Research_Publications";
import Training from "./Admin/Components/Training";
import Leadership from "./Admin/Components/Leadership";
import Activities from "./Admin/Components/Activities";
import Experience from "./Admin/Components/Experience";
import Appoinments from "./Admin/Components/Appoinments";
import Reviews from "./Admin/Components/Reviews";
import Gellery from "./Admin/Components/Gellery";
import NotFound from "./Admin/Pages/NotFound";

const App = () => {
  return (
    <Router>
      {/* Routes */}
      <Routes>
        {/* Public route */}
        <Route path="/" element={<HomeLayout />}>
          {/* children routes */}
          <Route index element={<HomePage />} />
        </Route>

        {/* Admin routes */}
        <Route path="/admin" element={<Dashboard />}>
          <Route path="" element={<HeroSection />} />
          <Route path="hero-section" element={<HeroSection />} />
          <Route path="about-me" element={<AboutMe />} />
          <Route path="skills" element={<Skills />} />
          <Route path="educations" element={<Educations />} />
          <Route path="publications" element={<Research_Publications />} />
          <Route path="settings" element={<Settings />} />
          <Route path="trainings" element={<Training />} />
          <Route path="leadership" element={<Leadership />} />
          <Route path="activities" element={<Activities />} />
          <Route path="experience" element={<Experience />} />
          <Route path="appoinments" element={<Appoinments />} />
          <Route path="reviews" element={<Reviews />} />
          <Route path="gellery" element={<Gellery />} />
        </Route>

        {/* 404 Not Found Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
