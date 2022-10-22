import { Auth, Hub } from "aws-amplify";
import React from "react";

export const AuthContext = React.createContext(null);

export const AuthContextProvider = (props) => {
  const [user, setUser] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState();

  const fetchCurrentUser = React.useCallback(() => {
    Auth.currentAuthenticatedUser()
      .then((_user) => setUser(_user))
      .catch((_error) => setError(_error))
      .finally(() => setLoading(false));
  }, [setUser, setError, setLoading]);

  React.useEffect(() => {
    fetchCurrentUser();
  }, [fetchCurrentUser]);
  Hub.listen("auth", () => {
    console.log("Yo!");
    fetchCurrentUser();
  });

  return <AuthContext.Provider value={{ user, loading, error }} {...props} />;
};

export const useAuthState = () => {
  const auth = React.useContext(AuthContext);
  return { ...auth, isAuthenticated: !!auth.user };
};
