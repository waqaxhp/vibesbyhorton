import { Routes, Route } from "react-router-dom";
import AuthLayout from "../layouts/auth-layout";
import ForgetPassword from "../pages/forget-password";
import Login from "../pages/Login";
import SignUp from "../pages/Sign-up";

const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AuthLayout />}>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="forgetpassword" element={<ForgetPassword />} />
      </Route>
    </Routes>
  );
};

export default AuthRoutes;
