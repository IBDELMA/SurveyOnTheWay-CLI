import { Container } from "@mui/material";
import { useGetPoll } from "api/useGetPoll";
import { PollForm } from "components/forms";
import { Paths } from "paths";
import React from "react";
import { Navigate, useParams } from "react-router-dom";

export const PollView = () => {
  const { pollId } = useParams();
  const { data, error, isLoading } = useGetPoll(pollId);
  console.log(data, error);
  return !isLoading ? (
    !!data ? (
      <Container maxWidth="md">
        <PollForm data={data} pollId={pollId} />
      </Container>
    ) : (
      <Navigate to={Paths.notFound()} />
    )
  ) : null;
};
