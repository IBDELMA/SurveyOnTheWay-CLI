import { useQuery } from "react-query";
import Config from "../config";

export const useGetPoll = (pollId) => {
  const config = Config.Express().getConfig();

  return useQuery(
    ["poll", pollId],
    async ({ queryKey }) => {
      const pollId = queryKey[1];
      const params = new URLSearchParams({
        pollId,
      });
      const response = await fetch(`${config.url}/public/get-poll?` + params, {
        method: "GET",
        mode: "cors",
      });
      return response?.json();
    },
    {
      retry: false,
      staleTime: Infinity,
    }
  );
};
