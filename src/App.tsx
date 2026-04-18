import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import IndexPage from "@/pages/IndexPage";
import AboutPage from "@/pages/AboutPage";
import ContactPage from "@/pages/ContactPage";
import WorkPage from "@/pages/WorkPage";
import AdminLogin from "@/pages/admin/AdminLogin";
import AdminIndex from "@/pages/admin/AdminIndex";
import AdminNewProject from "@/pages/admin/AdminNewProject";
import AdminEditProject from "@/pages/admin/AdminEditProject";
import { AdminGuard } from "@/components/admin/AdminGuard";
import NotFound from "@/pages/NotFound";

function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <PublicLayout>
              <IndexPage />
            </PublicLayout>
          }
        />
        <Route
          path="/about"
          element={
            <PublicLayout>
              <AboutPage />
            </PublicLayout>
          }
        />
        <Route
          path="/contact"
          element={
            <PublicLayout>
              <ContactPage />
            </PublicLayout>
          }
        />
        <Route
          path="/work/:slug"
          element={
            <PublicLayout>
              <WorkPage />
            </PublicLayout>
          }
        />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin"
          element={
            <AdminGuard>
              <AdminIndex />
            </AdminGuard>
          }
        />
        <Route
          path="/admin/projects/new"
          element={
            <AdminGuard>
              <AdminNewProject />
            </AdminGuard>
          }
        />
        <Route
          path="/admin/projects/:slug"
          element={
            <AdminGuard>
              <AdminEditProject />
            </AdminGuard>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
