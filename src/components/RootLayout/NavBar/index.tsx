import { AppBar, Box, Toolbar, IconButton, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useLocation } from "react-router-dom";
import useIsMobile from "@/hooks/common/useIsMobile";
import { getCapitalizedText } from "@/utils";

interface Props {
  drawerOpen: boolean;
  toggleDrawer: () => void;
}

const Navbar = ({ toggleDrawer }: Props) => {
  const { pathname } = useLocation();
  const { isMobile } = useIsMobile();

  return (
    <Box sx={{ flexGrow: 1, borderBottom: "2px solid lightgray", mb: 1 }}>
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

          {/* Page name */}
          <Typography component="h3" variant="h4" color="black">
            {getCapitalizedText(pathname.slice(1))}
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
