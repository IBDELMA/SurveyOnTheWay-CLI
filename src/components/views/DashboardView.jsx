import { Button, Container, Typography } from "@mui/material";
import { Auth } from "aws-amplify";
import React from "react";
import { useNavigate } from "react-router-dom";

export const DashboardView = () => {
  Auth.currentAuthenticatedUser().then((user) => console.log(user));
  const navigate = useNavigate();
  return (
    <Container maxWidth="xl">
      <Typography>Hello, DashboardView</Typography>
      <Button onClick={() => Auth.signOut().finally(() => navigate(0))}>
        {"Sign Out"}
      </Button>
    </Container>
  );
};
