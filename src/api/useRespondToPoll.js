import React from "react";
import Config from "../config";

export const useRespondToPoll = () => {
  const config = Config.Express().Dev;
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  return [
    async (data) => {
      setLoading(true);
      console.log("Hello!");
      const response = await fetch(`${config.url}/public/respond`, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
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
