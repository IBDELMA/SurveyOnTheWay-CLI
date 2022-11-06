import { Auth } from "aws-amplify";
import { useQuery } from "react-query";
import Config from "../config";

export const useGetUserPolls = (pollId) => {
  const config = Config.Express().Dev;

  return useQuery(
    ["polls"],
    async ({ queryKey }) => {
      const session = await Auth.currentSession();
      const response = await fetch(`${config.url}/auth/get-user-polls`, {
        method: "GET",
        mode: "cors",
        headers: {
          Authorization: session.getAccessToken().getJwtToken(),
        },
      });
      return response?.json();
    },
    {
      retry: false,
    }
  );
};
