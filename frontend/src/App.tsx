import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "@/components/Layout";
import HomePage from "@/pages/HomePage";
import AboutPage from "@/pages/AboutPage";
import EventsPage from "@/pages/EventsPage";
import DirectoryPage from "@/pages/DirectoryPage";
import HotelDetailPage from "@/pages/HotelDetailPage";
import ContactPage from "@/pages/ContactPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="events" element={<EventsPage />} />
          <Route path="membership" element={<DirectoryPage />} />
          <Route path="hotel/:id" element={<HotelDetailPage />} />
          <Route path="contact" element={<ContactPage />} />
          {/* Catch-all → Home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
