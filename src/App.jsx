import React from "react";
import { Amplify } from "aws-amplify";
import { BrowserRouter as Router } from "react-router-dom";
import { Routes } from "./routes";
import Config from "./config";
import { AuthContextProvider } from "contexts/AuthContext";
import { QueryClient, QueryClientProvider } from "react-query";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

export function App() {
  Amplify.configure(Config.Amplify());
  const queryClient = new QueryClient({});
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <Router>
          <Routes />
        </Router>
      </AuthContextProvider>
    </QueryClientProvider>
  );
}
