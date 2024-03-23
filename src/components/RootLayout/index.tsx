import { useState } from "react";
import { Container } from "@mui/material";
import Navbar from "@/components/RootLayout/NavBar";
import SideNav from "../SideNav";
import MainSection from "../MainSection";
import { Outlet } from "react-router-dom";
import useIsMobile from "@/hooks/common/useIsMobile";

const RootLayout = () => {
  const { isMobile } = useIsMobile();
  const [isSideNavOpen, setSideNavOpen] = useState(!isMobile);

  const toggleDrawer = () => {
    setSideNavOpen((oldState) => !oldState);
  };

  return (
    <div style={{ height: "100%", display: "flex" }}>
      <SideNav open={isSideNavOpen} toggleDrawer={toggleDrawer} />
      <MainSection drawerOpen={isSideNavOpen}>
        <Navbar drawerOpen={isSideNavOpen} toggleDrawer={toggleDrawer} />
        <Container
          component="main"
          maxWidth={false}
          sx={{
            backgroundColor: "background.main",
            padding: "10px 10px",
            display: "grid",
            alignItems: "start",
            height: isMobile ? "100%" : "100vmax",
          }}
        >
          <Outlet />
        </Container>
      </MainSection>
    </div>
  );
};

export default RootLayout;
