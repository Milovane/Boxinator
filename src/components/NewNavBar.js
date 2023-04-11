import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { Logo } from "./login-components/Logo";
import Divider from "@mui/material/Divider";

const pages = ["Products", "Pricing", "Blog"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

function NewNavBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

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
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
              <Divider />
              {/* Check authentication here and add log out or login function */}
              <Button
                variant="contained"
                key={"abc"}
                onClick={handleCloseNavMenu}
                sx={{
                  color: "white",
                  background: "blue",
                  display: "block",
                  mx: "6px",
                }}
              >
                Contained
              </Button>
              {/* <Button
                key={"abc"}
                onClick={handleCloseNavMenu}
                sx={{
                  color: "white",
                  background: "blue",
                  display: "block",
                  mx: "auto",
                }}
              >
                Login
              </Button> */}
            </Menu>
          </Box>

          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "#333", display: "block" }}
              >
                {page}
              </Button>
            ))}

            <Button
              variant="contained"
              key={"abc"}
              onClick={handleCloseNavMenu}
              sx={{
                color: "white",
                background: "blue",
                mx: "6px",
                my: "20px",
              }}
            >
              Contained
            </Button>
            {/* <Button
              key={"abc"}
              onClick={handleCloseNavMenu}
              sx={{
                my: 2,
                color: "white",
                background: "blue",
                display: "block",
              }}
            >
              Login
            </Button> */}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default NewNavBar;
