import { useState } from "react";
import { Container, useMediaQuery } from "@mui/material";
import Navbar from "@/components/RootLayout/NavBar";
import SideNav from "../SideNav";
import MainSection from "../MainSection";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  const [isSideNavOpen, setSideNavOpen] = useState(true);

  const toggleDrawer = () => {
    setSideNavOpen((oldState) => !oldState);
  };
  const small = useMediaQuery("(max-width:650px)");
  const containerPadding = small ? "15px" : "50px";

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
            padding: `10px ${containerPadding}`,
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
