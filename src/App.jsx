import React from "react";
import { Amplify } from "aws-amplify";
import { BrowserRouter as Router } from "react-router-dom";
import { Routes } from "./routes";
import Config from "./config";
import { AuthContextProvider } from "contexts/AuthContext";

export function App() {
  Amplify.configure(Config.Amplify());

  return (
    <AuthContextProvider>
      <Router>
        <Routes />
      </Router>
    </AuthContextProvider>
  );
}
