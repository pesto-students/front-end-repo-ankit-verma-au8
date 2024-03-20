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
import DashboardIcon from "@mui/icons-material/Dashboard";
import ExpenseIcon from "@mui/icons-material/FormatListBulleted";
import BudgetIcon from "@mui/icons-material/RequestQuote";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import { styled, Theme, CSSObject } from "@mui/material/styles";
import { useDispatch } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { authActions } from "@/store";
import { useNavigate, useLocation } from "react-router-dom";
import useIsMobile from "@/hooks/common/useIsMobile";

interface Props {
  open: boolean;
  toggleDrawer: () => void;
}

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
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

const ListButton = styled(ListItemButton)(({ theme, selected }) => ({
  backgroundColor: selected ? "red" : "initial",
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

  const pageList: Array<{
    text: string;
    icon: any;
    value?: string;
  }> = [
    { text: "Overview", value: "dashboard", icon: <DashboardIcon /> },
    { text: "Expenses", value: "expenses", icon: <ExpenseIcon /> },
    { text: "Budgets", value: "budgets", icon: <BudgetIcon /> },
    // { text: "Settings", value: "settings", icon: <SettingsIcon /> },
    { text: "Logout", icon: <LogoutIcon /> },
  ];

  const handleLogout = () => {
    dispatch(authActions.reset());
    navigate("/login");
  };

  const handleTabChange = (value: any) => {
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
        {pageList.slice(0, pageList.length - 1).map(({ text, value, icon }) => (
          <ListItem key={text} disablePadding>
            <ListButton
              selected={value === selectedTab}
              onClick={() => handleTabChange(value)}
            >
              <ListItemIcon>{icon}</ListItemIcon>
              <ListItemText primary={text} />
            </ListButton>
          </ListItem>
        ))}
      </List>
      <List sx={{ mt: "auto" }}>
        <ListItem disablePadding>
          <ListItemButton onClick={handleLogout}>
            <ListItemIcon>{pageList[pageList.length - 1].icon}</ListItemIcon>
            <ListItemText primary={pageList[pageList.length - 1].text} />
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
