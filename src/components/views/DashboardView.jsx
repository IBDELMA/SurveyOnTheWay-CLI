import { Container, Typography } from "@mui/material";
import { Auth } from "aws-amplify";
import { NavBar } from "components/nav/NavBar";
import React from "react";

export const DashboardView = () => {
  Auth.currentAuthenticatedUser().then((user) => console.log(user));
  return (
    <Container maxWidth="lg">
      <NavBar />
      <Typography>Hello, DashboardView</Typography>
    </Container>
  );
};
