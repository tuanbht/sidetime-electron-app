import React from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";

const ProtectedRoute: React.FC<RouteProps> = ({ children, ...rest }) => {
  let auth = { user: {} };
  return (
    <Route
      {...rest}
      render={({ location }) => {
        if (auth.user) return children;
        return (
          <Redirect
            to={{
              pathname: "/",
              state: { from: location },
            }}
          />
        );
      }}
    />
  );
};

export default ProtectedRoute;
