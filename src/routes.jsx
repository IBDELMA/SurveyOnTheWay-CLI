import React from "react";

import {
  CreatePollView,
  DashboardView,
  LoginView,
  PollView,
  SignupView,
  NotFoundView,
} from "./components/views";

import {
  Navigate,
  Route,
  Routes as Switch,
  useLocation,
} from "react-router-dom";
import { Paths } from "./paths";
import { useAuthState } from "contexts/AuthContext";

const RequireAuth = ({ children }) => {
  const { loading, isAuthenticated } = useAuthState();
  const location = useLocation();
  return loading ? null : isAuthenticated ? (
    children
  ) : (
    <Navigate to={Paths.login()} replace state={{ path: location.pathname }} />
  );
};

export const Routes = () => (
  <Switch>
    <Route path={Paths.signup()} element={<SignupView />} />
    <Route path={Paths.login()} element={<LoginView />} />
    <Route
      path={Paths.dashboard()}
      element={
        <RequireAuth>
          <DashboardView />
        </RequireAuth>
      }
    />
    <Route path={Paths.poll()} element={<PollView />} />
    <Route
      path={Paths.createPoll()}
      element={
        <RequireAuth>
          <CreatePollView />
        </RequireAuth>
      }
    />
    <Route path="*" element={<NotFoundView />} />
  </Switch>
);
