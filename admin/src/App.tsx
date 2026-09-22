import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/context/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import Layout from "@/components/Layout";
import Login from "@/pages/Login";
import Dashboard from "@/pages/Dashboard";
import HotelsListPage from "@/pages/HotelsListPage";
import HotelFormPage from "@/pages/HotelFormPage";
import EventsListPage from "@/pages/EventsListPage";
import EventFormPage from "@/pages/EventFormPage";
import News from "@/pages/News";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Toaster />
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Layout />}>
              <Route index element={<Dashboard />} />
              <Route path="hotels" element={<HotelsListPage />} />
              <Route path="hotels/new" element={<HotelFormPage />} />
              <Route path="hotels/:id/edit" element={<HotelFormPage />} />
              <Route path="events" element={<EventsListPage />} />
              <Route path="events/new" element={<EventFormPage />} />
              <Route path="events/:id/edit" element={<EventFormPage />} />
              <Route path="news" element={<News />} />
            </Route>
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
