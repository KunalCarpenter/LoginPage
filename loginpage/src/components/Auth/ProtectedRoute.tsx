import React from "react";
import { Navigate } from "react-router-dom";
import { getUser } from "../../utils/storage";
import { ROUTES } from "../../constants/routes";

interface Props {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<Props> = ({ children }) => {
  const user = getUser();

  if (!user) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  return children;
};

export default ProtectedRoute;
