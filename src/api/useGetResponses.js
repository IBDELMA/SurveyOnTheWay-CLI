import { useQuery } from "react-query";
import Config from "../config";

export const useGetResponses = (pollId) => {
  const config = Config.Express().getConfig();

  return useQuery(
    ["responses", pollId],
    async ({ queryKey }) => {
      const pollId = queryKey[1];
      const params = new URLSearchParams({
        pollId,
      });
      const responses = await fetch(
        `${config.url}/public/get-responses?` + params,
        {
          method: "GET",
          mode: "cors",
        }
      );
      return responses?.json();
    },
    {
      retry: false,
      staleTime: Infinity,
    }
  );
};
