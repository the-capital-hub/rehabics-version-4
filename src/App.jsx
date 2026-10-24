
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  Outlet,
} from "react-router-dom";

// Public components
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import AIFloatingAssistant from "./components/AIFloatingButton/AIFloatingButton";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";

// Public pages
import HomePage from "./pages/Home/Home";
import About from "./pages/About/About";
import Services from "./pages/Services/Services";
import Patients from "./pages/Patients/Patients";
import Contact from "./pages/Contact/Contact";
import Appointment from "./pages/Appointment/Appointment";
import AuthPage from "./pages/Auth/Auth";
import ServiceDetail from "./pages/Services/ServiceDetail";

// Patient panel
import PatientDashboard from "./pages/PatientDashboard/PatientDashboard";

// Physiotherapist panel
import "./pages/physiotherapist/physiotherapist.css";
import PhysiotherapistPage from "./pages/physiotherapist/PhysiotherapistPage";
import PhysiotherapistLayout from "./pages/physiotherapist/PhysiotherapistLayout";

// Admin panel
// Admin panel
import "./pages/admin/admin.css";
import AdminLayout from "./pages/admin/AdminLayout";

import {
  AdminOverview,
  AdminUsers,
  AdminAppointments,
  AdminBilling,
} from "./pages/admin/AdminPages";

// Read login session
function readSession() {
  const token =
    localStorage.getItem("rehabics_token") ||
    sessionStorage.getItem("rehabics_token") ||
    localStorage.getItem("token") ||
    sessionStorage.getItem("token");

  const rawUser =
    localStorage.getItem("rehabics_user") ||
    sessionStorage.getItem("rehabics_user") ||
    localStorage.getItem("user") ||
    sessionStorage.getItem("user");

  let user = null;

  try {
    user = rawUser ? JSON.parse(rawUser) : null;
  } catch {
    user = null;
  }

  return { token, user };
}

// Patient route protection
function PatientRoute() {
  const { token, user } = readSession();

  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role === "patient") {
    return <Outlet />;
  }

  if (user.role === "physiotherapist") {
    return <Navigate to="/physiotherapist/dashboard" replace />;
  }

  if (user.role === "admin") {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return <Navigate to="/login" replace />;
}

// Physiotherapist route protection
function PhysiotherapistRoute() {
  const { token, user } = readSession();

  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role === "physiotherapist") {
    return <Outlet />;
  }

  if (user.role === "patient") {
    return <Navigate to="/patient/dashboard" replace />;
  }

  if (user.role === "admin") {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return <Navigate to="/login" replace />;
}

// Admin route protection
function AdminRoute() {
  const { token, user } = readSession();

  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role === "admin") {
    return <Outlet />;
  }

  if (user.role === "patient") {
    return <Navigate to="/patient/dashboard" replace />;
  }

  if (user.role === "physiotherapist") {
    return <Navigate to="/physiotherapist/dashboard" replace />;
  }

  return <Navigate to="/login" replace />;
}

function App() {
  const location = useLocation();
  const pathname = location.pathname;

  // Hide public navigation inside dashboards
  const isPatientDashboard =
    pathname.startsWith("/patient/dashboard");

  const isPhysioPanel =
    pathname.startsWith("/physiotherapist");

  const isAdminPanel =
    pathname.startsWith("/admin");

  const hidePublicChrome =
    isPatientDashboard || isPhysioPanel || isAdminPanel;

  return (
    <>
      <ScrollToTop />

      {!hidePublicChrome && <Navbar />}

      <main>
        <Routes>
          {/* Public pages */}
          <Route path="/" element={<HomePage />} />

          <Route path="/about" element={<About />} />

          <Route path="/services" element={<Services />} />

          <Route
            path="/services/:slug"
            element={<ServiceDetail />}
          />

          <Route path="/patients" element={<Patients />} />

          <Route path="/contact" element={<Contact />} />

          <Route
            path="/appointment"
            element={<Appointment />}
          />

          <Route path="/login" element={<AuthPage />} />

          <Route path="/signup" element={<AuthPage />} />

          {/* Patient dashboard */}
          <Route element={<PatientRoute />}>
            <Route
              path="/patient/dashboard"
              element={<PatientDashboard />}
            />
          </Route>

          {/* Physiotherapist panel */}
          <Route element={<PhysiotherapistRoute />}>
            <Route
              path="/physiotherapist"
              element={<PhysiotherapistLayout />}
            >
              <Route
                index
                element={
                  <Navigate to="dashboard" replace />
                }
              />

              <Route
                path="dashboard"
                element={
                  <PhysiotherapistPage section="dashboard" />
                }
              />

              <Route
                path="patients"
                element={
                  <PhysiotherapistPage section="patients" />
                }
              />

              <Route
                path="appointments"
                element={
                  <PhysiotherapistPage section="appointments" />
                }
              />

              <Route
                path="recovery-plans"
                element={
                  <PhysiotherapistPage section="recovery-plans" />
                }
              />

              <Route
                path="exercises"
                element={
                  <PhysiotherapistPage section="exercises" />
                }
              />

              <Route
                path="messages"
                element={
                  <PhysiotherapistPage section="messages" />
                }
              />

              <Route
                path="profile"
                element={
                  <PhysiotherapistPage section="profile" />
                }
              />
            </Route>
          </Route>

          {/* Admin panel */}
        {/* Admin panel */}
<Route element={<AdminRoute />}>
  <Route path="/admin" element={<AdminLayout />}>
    <Route
      index
      element={<Navigate to="dashboard" replace />}
    />

    <Route
      path="dashboard"
      element={<AdminOverview />}
    />

    <Route
      path="users"
      element={<AdminUsers />}
    />

    <Route
      path="appointments"
      element={<AdminAppointments />}
    />

    <Route
      path="billing"
      element={<AdminBilling />}
    />
  </Route>
</Route>

          {/* Unknown routes */}
          <Route
            path="*"
            element={<Navigate to="/" replace />}
          />
        </Routes>
      </main>

      {!hidePublicChrome && <Footer />}

      {!hidePublicChrome && <AIFloatingAssistant />}
    </>
  );
}

export default App;
