import React, { useEffect } from "react";
import useAppContext from "../../hooks/useAppContext";
import { observer } from "mobx-react-lite";
import { Redirect, Route, RouteProps, useHistory } from "react-router-dom";

const ProtectedRoute: React.FC<RouteProps> = ({ children, ...rest }) => {
  const { authStore } = useAppContext();
  const history = useHistory();

  useEffect(() => {
    if (authStore.checkLoggedInUser()) return;
    history.push("/");
  }, [authStore, history, authStore.currentUser]);

  return (
    <Route
      {...rest}
      render={({ location }) => {
        if (authStore.checkLoggedInUser()) return children;
        return <Redirect to={{ pathname: "/", state: { from: location } }} />;
      }}
    />
  );
};

export default observer(ProtectedRoute);
