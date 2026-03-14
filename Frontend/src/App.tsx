import { lazy, Suspense, Component, type ReactNode } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/widgets/WhatsAppButton";
import ScrollToTop from "@/components/layout/ScrollToTop";
import ProtectedRoute from "@/components/admin/ProtectedRoute";

/* ── Lazy-loaded pages ───────────────────────────────── */
const HomePage = lazy(() => import("@/pages/HomePage"));
const ProjectsPage = lazy(() => import("@/pages/ProjectsPage"));
const AboutPage = lazy(() => import("@/pages/AboutPage"));
const ServicesPage = lazy(() => import("@/pages/ServicesPage"));
const ContactPage = lazy(() => import("@/pages/ContactPage"));
const LegalPage = lazy(() => import("@/pages/LegalPage"));
const ClientStoriesPage = lazy(() => import("@/pages/ClientStoriesPage"));
const AdminLogin = lazy(() => import("@/pages/admin/AdminLogin"));
const AdminDashboard = lazy(() => import("@/pages/admin/AdminDashboard"));
const AdminProjects = lazy(() => import("@/pages/admin/AdminProjects"));
const AdminProjectForm = lazy(() => import("@/pages/admin/AdminProjectForm"));
const AdminLeads = lazy(() => import("@/pages/admin/AdminLeads"));
const AdminContacts = lazy(() => import("@/pages/admin/AdminContacts"));
const AdminSubscribers = lazy(() => import("@/pages/admin/AdminSubscribers"));
const AdminSettings = lazy(() => import("@/pages/admin/AdminSettings"));
const AdminTestimonials = lazy(() => import("@/pages/admin/AdminTestimonials"));
const PropertiesPage = lazy(() => import("@/pages/PropertiesPage"));
const PropertyDetailPage = lazy(() => import("@/pages/PropertyDetailPage"));
const NotFoundPage = lazy(() => import("@/pages/NotFoundPage"));
const ForbiddenPage = lazy(() => import("@/pages/ForbiddenPage"));
const ServerErrorPage = lazy(() => import("@/pages/ServerErrorPage"));

/* ── Error Boundary ──────────────────────────────────── */
interface ErrorBoundaryState {
  hasError: boolean;
}
class ErrorBoundary extends Component<
  { children: ReactNode },
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = { hasError: false };
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) {
      return (
        <Suspense fallback={<PageLoader />}>
          <ServerErrorPage />
        </Suspense>
      );
    }
    return this.props.children;
  }
}

/* ── Loading fallback ────────────────────────────────── */
const PageLoader = () => (
  <div className="flex min-h-screen items-center justify-center bg-[#0B1F3A]">
    <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#C9A227] border-t-transparent" />
  </div>
);

function App() {
  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-background text-foreground">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-[#C9A227] focus:text-[#0B1F3A] focus:rounded-lg focus:font-semibold"
        >
          Skip to main content
        </a>
        <ScrollToTop />
        <Suspense fallback={<PageLoader />}>
          <Routes>
            {/* ── Public routes ──────────────────────────────────── */}
            <Route
              path="/*"
              element={
                <>
                  <Navbar />
                  <main id="main-content">
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
                      <Route
                        path="/properties"
                        element={<PropertiesPage />}
                      />
                      <Route
                        path="/properties/:id"
                        element={<PropertyDetailPage />}
                      />
                      <Route path="/forbidden" element={<ForbiddenPage />} />
                      <Route path="*" element={<NotFoundPage />} />
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
            <Route
              path="/admin/*"
              element={
                <ProtectedRoute>
                  <NotFoundPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Suspense>
      </div>
    </ErrorBoundary>
  );
}

export default App;
