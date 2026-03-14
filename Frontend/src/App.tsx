import { Routes, Route } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/widgets/WhatsAppButton";
import HomePage from "@/pages/HomePage";
import ProjectsPage from "@/pages/ProjectsPage";
import AboutPage from "@/pages/AboutPage";
import ServicesPage from "@/pages/ServicesPage";
import ContactPage from "@/pages/ContactPage";
import LegalPage from "@/pages/LegalPage";
import ScrollToTop from "@/components/layout/ScrollToTop";
import ProtectedRoute from "@/components/admin/ProtectedRoute";
import AdminLogin from "@/pages/admin/AdminLogin";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import AdminProjects from "@/pages/admin/AdminProjects";
import AdminProjectForm from "@/pages/admin/AdminProjectForm";
import AdminLeads from "@/pages/admin/AdminLeads";
import AdminContacts from "@/pages/admin/AdminContacts";
import AdminSubscribers from "@/pages/admin/AdminSubscribers";
import AdminSettings from "@/pages/admin/AdminSettings";
import AdminTestimonials from "@/pages/admin/AdminTestimonials";
import ClientStoriesPage from "@/pages/ClientStoriesPage";

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <ScrollToTop />
      <Routes>
        {/* ── Public routes ──────────────────────────────────── */}
        <Route
          path="/*"
          element={
            <>
              <Navbar />
              <main>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/projects" element={<ProjectsPage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/services" element={<ServicesPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="/privacy" element={<LegalPage />} />
                  <Route path="/terms" element={<LegalPage />} />
                  <Route path="/rera" element={<LegalPage />} />
                  <Route
                    path="/client-stories"
                    element={<ClientStoriesPage />}
                  />
                </Routes>
              </main>
              <Footer />
              <WhatsAppButton />
            </>
          }
        />

        {/* ── Admin routes ───────────────────────────────────── */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/projects"
          element={
            <ProtectedRoute>
              <AdminProjects />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/projects/new"
          element={
            <ProtectedRoute>
              <AdminProjectForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/projects/:id"
          element={
            <ProtectedRoute>
              <AdminProjectForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/leads"
          element={
            <ProtectedRoute>
              <AdminLeads />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/contacts"
          element={
            <ProtectedRoute>
              <AdminContacts />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/subscribers"
          element={
            <ProtectedRoute>
              <AdminSubscribers />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/testimonials"
          element={
            <ProtectedRoute>
              <AdminTestimonials />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/settings"
          element={
            <ProtectedRoute>
              <AdminSettings />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
