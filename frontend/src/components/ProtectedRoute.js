import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRouteElement = ({
  element: Component,
  loggedIn,
  ...restProps
}) => {
  return loggedIn ? (
    <Component {...restProps} />
  ) : (
    <Navigate to="/signin" replace />
  );
};

export default ProtectedRouteElement;
