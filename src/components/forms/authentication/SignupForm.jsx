import { Auth } from "aws-amplify";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { Paths } from "paths";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";

export const SignupForm = () => {
  const navigate = useNavigate();
  const { handleSubmit, control, setError, getValues } = useForm();
  const [isRegistering, setIsRegistering] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const { state } = useLocation();

  const onCreateUser = () => {
    navigate(state?.path || Paths.login());
  };

  const onSubmit = (data) => {
    setIsRegistering(true);
    Auth.signUp({
      username: data.email,
      password: data.password,
      attributes: {
        nickname: data.username,
      },
    })
      .then(() => onCreateUser())
      .catch((err) => {
        setIsRegistering(false);
        console.log(err.code, err.message);
        switch (err.code) {
          case "InvalidPasswordException":
            setError("password", {
              type: err.code,
              message: err.message.replace(
                "Password did not conform with policy: ",
                ""
              ),
            });
            break;
          case "UsernameExistsException":
            setError("email", {
              type: err.code,
              message: err.message,
            });
            break;
          default:
            break;
        }
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="username"
        control={control}
        defaultValue=""
        rules={{
          required: "Username required",
        }}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <TextField
            fullWidth
            label="Username"
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
      </Box>
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
              type={showPassword ? "text" : "password"}
              value={value}
              error={!!error}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                      tabIndex={-1}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              helperText={error ? error.message : null}
              onChange={onChange}
            />
          )}
        />
      </Box>
      <Box mt={2}>
        <Controller
          name="confirm-password"
          control={control}
          defaultValue=""
          rules={{
            validate: (value) =>
              getValues("password") === value || "Passwords do not match",
          }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              fullWidth
              label="Confirm Password"
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
          disabled={isRegistering}
          fullWidth
          variant="contained"
        >
          <Box m={1}>
            {isRegistering ? (
              <CircularProgress size={20} />
            ) : (
              <Typography>Sign Up</Typography>
            )}
          </Box>
        </Button>
      </Box>
    </form>
  );
};
