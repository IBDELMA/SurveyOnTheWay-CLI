import {
  TextField,
  Box,
  Button,
  CircularProgress,
  Typography,
} from "@mui/material";
import React from "react";
import { Auth } from "aws-amplify";
import { Controller, useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Paths } from "../../../paths";

export const LoginForm = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { handleSubmit, control, setError } = useForm();
  const [isLoggingIn, setIsLoggingIn] = React.useState(false);

  const onLogin = () => {
    navigate(state?.path || Paths.dashboard());
  };

  const onSubmit = (data) => {
    setIsLoggingIn(true);
    Auth.signIn(data.email, data.password)
      .then(() => onLogin())
      .catch((error) => {
        setIsLoggingIn(false);
        console.log(error);
        setError("email", {
          type: error.code,
          message: error.message,
        });
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="email"
        control={control}
        defaultValue=""
        rules={{
          required: "E-mail address required",
        }}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <TextField
            fullWidth
            label="E-mail"
            variant="outlined"
            value={value}
            error={!!error}
            helperText={error ? error.message : null}
            onChange={onChange}
          />
        )}
      />
      <Box mt={2}>
        <Controller
          name="password"
          control={control}
          defaultValue=""
          rules={{ required: "Password required" }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              fullWidth
              label="Password"
              variant="outlined"
              type="password"
              value={value}
              error={!!error}
              helperText={error ? error.message : null}
              onChange={onChange}
            />
          )}
        />
      </Box>
      <Box mt={2}>
        <Button
          type="submit"
          disabled={isLoggingIn}
          fullWidth
          variant="contained"
        >
          <Box m={1}>
            {isLoggingIn ? (
              <CircularProgress size={20} />
            ) : (
              <Typography>Login</Typography>
            )}
          </Box>
        </Button>
      </Box>
      <Box display="flex" justifyContent="center" mt={2}>
        <Typography>
          {"Don't have an account? "}
          <Link
            to={Paths.signup()}
            style={{ textDecoration: "none" }}
            state={{ path: state?.path }}
          >
            Signup here!
          </Link>
        </Typography>
      </Box>
    </form>
  );
};
