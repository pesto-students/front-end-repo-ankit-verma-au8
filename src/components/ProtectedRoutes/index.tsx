import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { isUserLoggedIn } from "@/store";

const ProtectedRoutes = () => {
  const isLoggedIn = useSelector(isUserLoggedIn);

  return isLoggedIn ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoutes;
