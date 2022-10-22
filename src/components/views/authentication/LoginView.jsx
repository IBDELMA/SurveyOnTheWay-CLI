import { Grid } from "@mui/material";
import { LoginForm } from "components/forms";
import React from "react";

export const LoginView = () => (
  <Grid
    container
    direction="row"
    alignItems="center"
    justifyContent="center"
    style={{ minHeight: "100vh" }}
  >
    <Grid item xs={3}>
      <LoginForm />
    </Grid>
  </Grid>
);
