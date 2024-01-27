import { Container } from "@mui/material";
// import Navbar from "./Navbar";
import Navbar from "@/components/RootLayout/NavBar";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <div style={{ height: "100%" }}>
      <Navbar />
      <Container
        component="main"
        maxWidth={false}
        style={{ padding: "10px 0px", display: "grid", placeItems: "center" }}
      >
        <Outlet />
      </Container>
    </div>
  );
};

export default RootLayout;
