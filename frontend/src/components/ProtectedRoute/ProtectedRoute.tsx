import { Navigate, Outlet } from "react-router";
import { useUser } from "../../context/UserContext";

const ProtectedRoute = () => {
  const { accessToken } = useUser();

  return accessToken ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
