import {
  AppBar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import { useAuthState } from "contexts/AuthContext";
import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { Paths } from "paths";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { Auth } from "aws-amplify";

export const NavBar = () => {
  const { user } = useAuthState();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { state } = useLocation();
  const navigate = useNavigate();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box pt={1} pb={2}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link
              to={Paths.dashboard()}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              {"SurveyOnTheWay"}
            </Link>
          </Typography>
          <Box display="flex" alignItems="center">
            <Box mr={2}>
              <Typography>
                {"Currently logged in: "}
                <b>{user.attributes.nickname}</b>
              </Typography>
            </Box>
            <IconButton
              size="large"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>
                <Link
                  to={Paths.signup()}
                  style={{ textDecoration: "none" }}
                  state={{ path: state?.path }}
                >
                  {"Sign Up"}
                </Link>
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleClose();
                  Auth.signOut().finally(() => navigate(0));
                }}
              >
                {"Log Out"}
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
