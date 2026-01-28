import "./App.css";
import { Navigate, Route, Routes } from "react-router";
import { LoginPage } from "./Pages/auth/loginPage";
import { RegisterPage } from "./Pages/auth/RegisterPage";
import { DashboardPage } from "./Pages/Dasboard/DashboardPage";
import { ProtectedRoute } from "./components/ui/auth/ProtectedRoute";
import { Admin } from "./Pages/Dasboard/Admin";
import { AdminProtectRoute } from "./components/ui/auth/AdminProtectRoute";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="register" element={<RegisterPage />} />
      {/* TODO to protected route  */}
      <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
      <Route path="/admin" element={<AdminProtectRoute><Admin/></AdminProtectRoute>} />
      <Route path="/" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;
