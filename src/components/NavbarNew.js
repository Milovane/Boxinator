import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { Logo } from "./login-components/Logo";
import Divider from "@mui/material/Divider";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../context";
import { ROLES } from "../const/roles";
import SnackBarComponent from "./UserFeedback/SnackBarComponent";
import { SnackbarMessageSeverity } from "../const/SnackbarMessageSeverity";
import { pagesAndLinks } from "../const/pagesAndLinks";
import keycloak, { user } from "../keycloak";

function NavbarNew() {
  const [state, setState] = React.useState({
    open: false,
    snackbarMessage: "Empty",
    severity: "success",
  });

  React.useEffect(() => {
    console.log("keycloak uppdaterades?");
    //navigate to register page if user null
    if (keycloak.authenticated && user == null) {
      navigate("/register");
    }
  }, [keycloak.token]);

  const navigate = useNavigate();
  const { context, updateContext } = useContext(Context);

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  function logoutFromKeyCloak() {
    handleCloseNavMenu();
    navigate("/");
    keycloak.logout();
  }

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  function openSnackBar(message, messageSeverity) {
    const newState = {
      open: true,
      snackbarMessage: message,
      severity: messageSeverity,
    };

    setState({ ...newState });
  }

  const closeSnackbar = () => {
    const newState = {
      open: false,
      snackbarMessage: "",
      severity: "success",
    };
    setState({ ...newState });
  };

  function loginToKeycloak() {
    handleCloseNavMenu();
    keycloak.login();
  }

  return (
    <AppBar position="sticky" style={{ background: "#fff", color: "#333" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: "flex" }}>
            <Logo w="w-8" h="h-8" textColor={"text-dark"} />
          </Box>

          <Box
            sx={{
              display: { xs: "flex", md: "none" },
              right: "0",
            }}
          >
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              keepMounted
              disableScrollLock={true}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pagesAndLinks.map(
                (page) =>
                  !page.Authenticated && (
                    <MenuItem
                      key={page.Name}
                      onClick={handleCloseNavMenu}
                      component={NavLink}
                      to={page.Link}
                    >
                      {page.Name}
                    </MenuItem>
                  )
              )}

              {keycloak.authenticated &&
                pagesAndLinks.map(
                  (page) =>
                    !page.Admin &&
                    page.Authenticated && (
                      <MenuItem
                        key={page.Name}
                        onClick={handleCloseNavMenu}
                        component={NavLink}
                        to={page.Link}
                      >
                        {page.Name}
                      </MenuItem>
                    )
                )}

              {keycloak.authenticated &&
                keycloak.hasRealmRole(ROLES.Admin) &&
                pagesAndLinks.map(
                  (page) =>
                    page.Admin &&
                    page.Authenticated && (
                      <MenuItem
                        key={page.Name}
                        onClick={handleCloseNavMenu}
                        component={NavLink}
                        to={page.Link}
                      >
                        {page.Name}
                      </MenuItem>
                    )
                )}

              <Divider />
              {!keycloak.authenticated && (
                <Button
                  variant="contained"
                  key={"abc"}
                  onClick={() => loginToKeycloak()}
                  sx={{
                    color: "white",
                    background: "blue",
                    display: "block",
                    mx: "6px",
                  }}
                >
                  Login
                </Button>
              )}
              {keycloak.authenticated && (
                <Button
                  variant="contained"
                  key={"abc"}
                  onClick={() => logoutFromKeyCloak()}
                  sx={{
                    color: "white",
                    background: "blue",
                    display: "block",
                    mx: "6px",
                  }}
                >
                  Logout
                </Button>
              )}
            </Menu>
          </Box>

          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            {pagesAndLinks.map(
              (page) =>
                !page.Authenticated && (
                  <Button
                    component={NavLink}
                    to={page.Link}
                    key={page.Name}
                    onClick={handleCloseNavMenu}
                    sx={{ my: "auto", color: "#333", display: "block" }}
                  >
                    {page.Name}
                  </Button>
                )
            )}

            {keycloak.authenticated &&
              pagesAndLinks.map(
                (page) =>
                  !page.Admin &&
                  page.Authenticated && (
                    <Button
                      component={NavLink}
                      to={page.Link}
                      key={page.Name}
                      onClick={handleCloseNavMenu}
                      sx={{ my: "auto", color: "#333", display: "block" }}
                    >
                      {page.Name}
                    </Button>
                  )
              )}

            {keycloak.authenticated &&
              keycloak.hasRealmRole(ROLES.Admin) &&
              pagesAndLinks.map(
                (page) =>
                  page.Admin &&
                  page.Authenticated && (
                    <Button
                      component={NavLink}
                      to={page.Link}
                      key={page.Name}
                      onClick={handleCloseNavMenu}
                      sx={{ my: "auto", color: "#333", display: "block" }}
                    >
                      {page.Name}
                    </Button>
                  )
              )}

            {keycloak.authenticated && (
              <Button
                variant="contained"
                key={"abc"}
                onClick={() => logoutFromKeyCloak()}
                sx={{
                  color: "white",
                  background: "blue",
                  mx: "6px",
                  my: "20px",
                }}
              >
                Logout
              </Button>
            )}
            {!keycloak.authenticated && (
              <Button
                variant="contained"
                key={"abc"}
                onClick={() => loginToKeycloak()}
                sx={{
                  color: "white",
                  background: "blue",
                  mx: "6px",
                  my: "20px",
                }}
              >
                Login
              </Button>
            )}
          </Box>
        </Toolbar>
      </Container>
      <SnackBarComponent
        snackbarDetails={state}
        closeSnack={() => closeSnackbar}
      />
    </AppBar>
  );
}
export default NavbarNew;
