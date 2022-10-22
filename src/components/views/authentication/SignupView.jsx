import { Grid } from "@mui/material";
import { SignupForm } from "components/forms";
import React from "react";

export const SignupView = () => (
  <Grid
    container
    direction="row"
    alignItems="center"
    justifyContent="center"
    style={{ minHeight: "100vh" }}
  >
    <Grid item xs={3}>
      <SignupForm />
    </Grid>
  </Grid>
);
