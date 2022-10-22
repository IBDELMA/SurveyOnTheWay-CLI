import { Container } from "@mui/material";
import { CreatePollForm } from "components/forms";
import { NavBar } from "components/nav/NavBar";
import React from "react";

export const CreatePollView = () => {
  return (
    <Container maxWidth="lg">
      <NavBar />
      <CreatePollForm />
    </Container>
  );
};
