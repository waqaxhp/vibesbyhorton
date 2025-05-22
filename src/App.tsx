import { Routes, Route, Navigate } from 'react-router-dom';
import WebRoutes from './apps/web/routes/web-routes';
import AuthRoutes from './apps/auth/routes/auth-routes';
import DashboardRoutes from './apps/dashboard/routes/dashboard-routes';
function App() {
  return (
    <Routes>
      {/* Web routes ("/", "/home", "/about") */}
      <Route path="/*" element={<WebRoutes />} />

      {/* Auth routes ("/auth/login", "/auth/signup") */}
      <Route path="/auth/*" element={<AuthRoutes />} />

      {/* Dashboard routes ("/dashboard/home") */}
      <Route path="/dashboard/*" element={<DashboardRoutes />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
    
    </Routes>
  );
}

export default App;
