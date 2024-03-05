import { useState } from "react";
import { Container } from "@mui/material";
import Navbar from "@/components/RootLayout/NavBar";
import SideNav from "../SideNav";
import MainSection from "../MainSection";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  const [isSideNavOpen, setSideNavOpen] = useState(true);

  const toggleDrawer = () => {
    setSideNavOpen((oldState) => !oldState);
  };

  return (
    <div style={{ height: "100%", display: "flex" }}>
      <SideNav open={isSideNavOpen} toggleDrawer={toggleDrawer} />
      <MainSection drawerOpen={isSideNavOpen}>
        <Navbar />
        <Container
          component="main"
          maxWidth={false}
          sx={{
            backgroundColor: "background.main",
            padding: "10px 50px",
            border: "1px solid red",
            display: "grid",
            alignItems: "start",
            height: "100%",
          }}
        >
          <Outlet />
        </Container>
      </MainSection>
    </div>
  );
};

export default RootLayout;
