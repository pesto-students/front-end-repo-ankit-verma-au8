import { useState } from "react";
import {
  Drawer as MUIDrawer,
  IconButton,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { styled, Theme, CSSObject } from "@mui/material/styles";
import { useDispatch } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { authActions } from "@/store";
import { useNavigate, useLocation } from "react-router-dom";
import useIsMobile from "@/hooks/common/useIsMobile";
import { SIDENAVOPTIONS } from "@/constants";

interface Props {
  open: boolean;
  toggleDrawer: () => void;
}

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

const openedMixin = (theme: Theme): CSSObject => ({
  width: 240,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const Drawer = styled(MUIDrawer)(({ theme, open }) => ({
  width: 240,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const SideNav = ({ open, toggleDrawer }: Props) => {
  const location = useLocation();
  const [selectedTab, setSelectedTab] = useState(() => {
    let currentTab = location.pathname.replace("/", "");
    return currentTab;
  });
  const { isMobile } = useIsMobile();
  const navigate = useNavigate();
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  const handleLogout = () => {
    dispatch(authActions.reset());
    navigate("/login");
  };

  const handleTabChange = (value: string) => {
    setSelectedTab(value);
    navigate(`/${value}`);
  };

  const DrawerContent = (
    <>
      <DrawerHeader>
        {!isMobile && (
          <IconButton onClick={toggleDrawer}>
            {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        )}
      </DrawerHeader>
      <Divider />
      <List>
        {SIDENAVOPTIONS.slice(0, SIDENAVOPTIONS.length - 1).map(
          ({ title, value, icon }) => (
            <ListItem key={title} disablePadding>
              <ListItemButton
                selected={value === selectedTab}
                onClick={() => handleTabChange(value)}
              >
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText primary={title} />
              </ListItemButton>
            </ListItem>
          )
        )}
      </List>
      <List sx={{ mt: "auto" }}>
        <ListItem disablePadding>
          <ListItemButton onClick={handleLogout}>
            <ListItemIcon>
              {SIDENAVOPTIONS[SIDENAVOPTIONS.length - 1].icon}
            </ListItemIcon>
            <ListItemText
              primary={SIDENAVOPTIONS[SIDENAVOPTIONS.length - 1].title}
            />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
    </>
  );

  return (
    <>
      {isMobile ? (
        <Drawer
          variant="temporary"
          open={open}
          onClose={toggleDrawer}
          ModalProps={{
            keepMounted: true,
          }}
        >
          {DrawerContent}
        </Drawer>
      ) : (
        <Drawer variant="permanent" open={open}>
          {DrawerContent}
        </Drawer>
      )}
    </>
  );
};

export default SideNav;
