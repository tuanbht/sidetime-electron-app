import React from "react";
import ProtectedRoute from "./ProtectedRoute";
import LoginScreen from "../screens/Login";
import CallRequestListScreen from "../screens/CallRequest/List";
import CallRequestSessionScreen from "../screens/CallRequest/Session";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Switch>
        <ProtectedRoute path="/call_requests" exact>
          <CallRequestListScreen />
        </ProtectedRoute>
        <ProtectedRoute path="/:siteSlug/call_requests/:slug" exact>
          <CallRequestSessionScreen />
        </ProtectedRoute>
        <Route path="/">
          <LoginScreen />
        </Route>
      </Switch>
    </Router>
  );
};

export default AppRouter;
