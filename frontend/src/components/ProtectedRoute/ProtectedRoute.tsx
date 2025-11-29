import { Navigate } from "react-router-dom";
import { getLocalStorage } from "../../libs/localStorageApi";
import type React from "react";

export type ProtectedRouteType = {
  children: React.ReactNode;
};

function ProtectedRoute({ children }: ProtectedRouteType) {
  const token = getLocalStorage("accessToken");
  if (!token) {
    return <Navigate to={"/loginPage"} replace />;
  }
  return <>{children}</>;
}
export default ProtectedRoute;
