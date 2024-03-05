import { styled } from "@mui/material/styles";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { isUserLoggedIn } from "@/store";

interface Props {
  drawerOpen: boolean;
  toggleDrawer: () => void;
}

const NavbarButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.common.black,
  "&:hover": {
    color: theme.palette.common.black,
  },
}));

const Navbar = ({ drawerOpen, toggleDrawer }: Props) => {
  const navigate = useNavigate();
  const isLoggedIn = useSelector(isUserLoggedIn);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleProfileMenuOpen = (): void => {
    // setAnchorEl(event.currentTarget);
    if (!isLoggedIn) {
      navigate("/login");
    }
  };

  // const handleMobileMenuClose = () => {
  //   setMobileMoreAnchorEl(null);
  // };

  const menuId = "primary-search-account-menu";

  return (
    <Box sx={{ flexGrow: 1, borderBottom: "1px solid black" }}>
      <AppBar position="static" elevation={0} style={{ background: "white" }}>
        <Toolbar>
          {isMobile && (
            <Box sx={{ display: { xs: "flex" } }}>
              <IconButton
                aria-label="open drawer"
                onClick={toggleDrawer}
                edge="start"
                sx={{
                  mr: 2,
                }}
              >
                <MenuIcon />
              </IconButton>
            </Box>
          )}

          <Box sx={{ flexGrow: 1 }} />

          <Box sx={{ display: { xs: "flex" } }}>
            <Typography component="h3" color="black">
              {isLoggedIn ? "Logged In" : "Not logged in"}
            </Typography>
          </Box>

          <Box sx={{ flexGrow: 1 }} />

          {/* Header Right Section */}
          <Box sx={{ display: { xs: "flex" } }}>
            {/* Profile Icon */}
            <NavbarButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="primary"
              sx={{ mr: 0.5 }}
            >
              {/* <NavbarLogo src={logoSvg} alt="The Tea Lab" sx={{ mx : "auto", }} /> */}
              <AccountCircle sx={{ fontSize: "2rem" }} />
              {/* </RouterLink> */}
            </NavbarButton>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
