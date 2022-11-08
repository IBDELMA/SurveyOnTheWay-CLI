import React from "react";
import { Auth } from "aws-amplify";
import Config from "../config";

export const useCreatePoll = () => {
  const config = Config.Express().getConfig();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  return [
    async (data) => {
      setLoading(true);
      const session = await Auth.currentSession();
      const response = await fetch(`${config.url}/auth/create-poll`, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: session.getAccessToken().getJwtToken(),
        },
        body: JSON.stringify(data),
      })
        .catch((e) => setError(e))
        .finally(() => setLoading(false));
      return response;
    },
    loading,
    error,
  ];
};
