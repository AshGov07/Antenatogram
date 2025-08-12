import { Route, Routes } from 'react-router-dom';
import ForgotPassword from './pages/forgotPassword';
import Register from './pages/register';
import LandingPage from './pages/landingPage';
import Login from './pages/login';
import Layout from './pages/layout';
import Dashboard from './pages/dashboard';
import RequireAuth from './pages/requireAuth';
import PatientHistory from './pages/patientHistory';
import AllScansAndReports from './pages/allFiles';
import AllPatients from './pages/allPatients';
import UploadReport from './pages/uploadPage';
import AllAppointments from './pages/allAppointments';

function App() {
  // Debug: show current route
  console.log("Current route:", window.location.pathname);

  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        {/* Public Routes */}
        <Route index element={<LandingPage />} />
        <Route path='login' element={<Login />} />
        <Route path='register' element={<Register />} />
        <Route path='forgot-password' element={<ForgotPassword />} />

        {/* Protected Routes */}
        <Route element={<RequireAuth allowedRoles={["patient", "doctor"]} />}>
          <Route path='user' element={<Dashboard />} />
          <Route path='profile' element={<PatientHistory />} />
          <Route path='files' element={<AllScansAndReports />} />
          <Route path='appointments' element={<AllAppointments />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={["doctor"]} />}>
          <Route path='patients' element={<AllPatients />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={["patient"]} />}>
          <Route path='upload' element={<UploadReport />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
