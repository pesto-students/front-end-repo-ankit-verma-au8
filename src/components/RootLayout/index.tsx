import { Container } from "@mui/material";
import Navbar from "@/components/RootLayout/NavBar";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <div style={{ height: "100%" }}>
      <Navbar />
      <Container
        component="main"
        maxWidth={false}
        style={{
          padding: "10px 50px",
          border: "1px solid red",
          display: "grid",
          alignItems: "start",
          height: "100%",
        }}
      >
        <Outlet />
      </Container>
    </div>
  );
};

export default RootLayout;
