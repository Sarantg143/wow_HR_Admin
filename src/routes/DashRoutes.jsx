import React from "react";
import { Routes, Route } from "react-router-dom";
import CoreTeam from "../components/leadership/CoreTeam";
import Testimonials from "../components/Testimonials/Testimonials";
import Events from "../components/events/Events";
import KnowledgeHub from "../components/KnowledgeHub/KnowledgeHub";
import LoginForm from "../components/auth/LoginForm";
import BusinessPartners from "../components/BusinessPartners/BusinessPartners";

const DashRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginForm />} />
      <Route path="/leaders" element={<CoreTeam />} />
      <Route path="/testimonials" element={<Testimonials />} />
      <Route path="/events" element={<Events />} />
      <Route path="/knowledgeHub" element={<KnowledgeHub />} />
      <Route path="/admin/partners" element={<BusinessPartners />} />
    </Routes>
  );
};

export default DashRoutes;