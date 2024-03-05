import { ReactNode } from "react";
import { styled } from "@mui/material";

interface Props {
  children: ReactNode;
  drawerOpen: boolean;
}

const Main = styled("div", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

const MainSection = ({ drawerOpen, children }: Props) => {
  return <Main open={drawerOpen}>{children}</Main>;
};

export default MainSection;
